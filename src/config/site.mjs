export const siteConfig = Object.freeze({
  name: 'Finapso',
  language: 'pl',
  title: 'Finapso',
  description: 'Oficjalna strona i centrum prawne aplikacji Finapso.',
  origin: 'https://bartmannn.github.io',
  basePath: '/finapso-legal',
  publicUrl: 'https://bartmannn.github.io/finapso-legal/',
  supportEmail: 'finapso.support@gmail.com',
});

export const routes = Object.freeze({
  home: '/',
  features: '/features/',
  docs: '/docs/',
  gettingStarted: '/docs/getting-started/',
  dataAndBackups: '/docs/data-and-backups/',
  receipts: '/docs/receipts/',
  notifications: '/docs/notifications/',
  privacy: '/privacy/',
  privacyArchive: '/privacy/archive/',
  terms: '/terms/',
  support: '/support/',
  licenses: '/licenses/',
  routingCheck: '/docs/routing-check/',
});

export const noIndexRoutes = Object.freeze([
  routes.notifications,
  routes.routingCheck,
  routes.privacyArchive,
  routes.terms,
  routes.licenses,
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
