import NextAuth from 'next-auth';

import authConfig from '@/auth.config';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log('nextUrl.pathname', nextUrl.pathname);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  let isPublicRoute = false;
  publicRoutes.forEach((route) => {
    if (nextUrl.pathname.startsWith(route)) {
      isPublicRoute = true;
    }
  });
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl));
  }
  return null;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
