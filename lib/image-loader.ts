import path from 'node:path';

export default function myImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  let origin = process.env.NEXTAUTH_URL;
  if (!origin) {
    // Then this code must be executed client-side
    origin = window.location.origin;
  }

  if (!origin) {
    throw new Error('No origin found - please make sure to provide NEXTAUTH_URL in your environment variables.');
  }

  if (origin.endsWith('/')) {
    origin = origin.slice(0, -1);
  }

  return `${origin}${src}?w=${width}&q=${quality || 75}`
}