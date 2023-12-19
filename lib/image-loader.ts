'use client'

export default function myImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const isClient = typeof window !== 'undefined';
  let origin = isClient ? window.location.origin : '';
  if (!isClient) {
    origin = process.env.NODE_ENV === "production" ? 'http://localhost:4000' : 'http://localhost:3000';
  }

  return `${origin}${src}?w=${width}&q=${quality || 75}`
}