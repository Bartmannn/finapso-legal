import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import type { Loader } from 'astro/loaders';

interface LocalMarkdownEntry {
  id: string;
  file: string;
  data: Record<string, unknown>;
}

export function localMarkdownLoader(name: string, entries: LocalMarkdownEntry[]): Loader {
  return {
    name: `finapso-${name}-markdown-loader`,
    async load({ config, generateDigest, parseData, renderMarkdown, store }) {
      store.clear();

      for (const entry of entries) {
        const fileUrl = new URL(entry.file, config.root);
        const source = await readFile(fileUrl, 'utf8');
        const filePath = fileURLToPath(fileUrl);
        const data = await parseData({ id: entry.id, data: entry.data, filePath });
        const rendered = await renderMarkdown(source, { fileURL: fileUrl });

        store.set({
          id: entry.id,
          data,
          body: source,
          rendered,
          filePath: entry.file,
          digest: generateDigest(`${JSON.stringify(entry.data)}\n${source}`),
        });
      }
    },
  };
}
