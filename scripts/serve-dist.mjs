import { createReadStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';

const port = Number.parseInt(process.argv[2] ?? '4321', 10);
const host = '127.0.0.1';
const basePath = '/finapso-legal/';
const distRoot = path.resolve(process.cwd(), 'dist');
const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host ?? `${host}:${port}`}`);
  if (url.pathname === '/robots.txt') {
    response.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    });
    createReadStream(path.join(distRoot, 'robots.txt')).pipe(response);
    return;
  }
  if (!url.pathname.startsWith(basePath)) {
    response.writeHead(302, { Location: basePath });
    response.end();
    return;
  }

  const relativePath = decodeURIComponent(url.pathname.slice(basePath.length));
  const requested = relativePath === '' || relativePath.endsWith('/')
    ? path.join(distRoot, relativePath, 'index.html')
    : path.join(distRoot, relativePath);
  const resolved = path.resolve(requested);
  let file = resolved.startsWith(`${distRoot}${path.sep}`) || resolved === path.join(distRoot, 'index.html')
    ? resolved
    : '';
  let status = 200;

  if (!file || !(await exists(file))) {
    file = path.join(distRoot, '404.html');
    status = 404;
  }

  const contentType = mimeTypes.get(path.extname(file).toLowerCase()) ?? 'application/octet-stream';
  response.writeHead(status, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store',
  });
  createReadStream(file).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Finapso dist server: http://${host}:${port}${basePath}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
