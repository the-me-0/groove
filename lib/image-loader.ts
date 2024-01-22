'use client'

export default function myImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const isClient = typeof window !== 'undefined';
  let origin = isClient ? window.location.origin : '';
  if (!isClient) {
    origin = process.env.NODE_ENV === "production" ? (process.env.PRODUCTION_URL || 'https://services.tars.digital:6783/groove') : 'http://localhost:3000';
  }

  return `${origin}${src}?w=${width}&q=${quality || 75}`
}