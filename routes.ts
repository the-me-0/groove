/**
 * An array of routes that are accessible to the public.
 * These routes are not protected by authentication.
 * @type {string[]}
 */
export const publicRoutes = [
  '/api/sponsorship' // has to be public so that we can send POST to create the first user
];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /
 * @type {string[]}
 */
export const authRoutes = [
  '/auth/login',
  '/auth/register',
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes and therefore public.
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/';
