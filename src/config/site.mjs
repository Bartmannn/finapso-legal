export const siteConfig = Object.freeze({
  name: 'Finapso',
  language: 'pl',
  title: 'Finapso',
  description: 'Regulamin i polityka prywatności aplikacji Finapso.',
  origin: 'https://bartmannn.github.io',
  basePath: '/finapso-legal',
  publicUrl: 'https://bartmannn.github.io/finapso-legal/',
  supportEmail: 'finapso.support@gmail.com',
});

export const routes = Object.freeze({
  home: '/',
  privacy: '/privacy/',
  terms: '/terms/',
});

export const noIndexRoutes = Object.freeze([
  routes.privacy,
  routes.terms,
  '/404/',
]);

/** @param {string} path */
export function withBase(path) {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const relativePath = path.replace(/^\/+/, '');

  return `${base}${relativePath}`.replace(/\/{2,}/g, '/');
}
