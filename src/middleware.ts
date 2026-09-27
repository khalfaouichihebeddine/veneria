import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Exclut api, _next, _vercel, admin et tous les fichiers statiques contenant une extension
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)'],
};
