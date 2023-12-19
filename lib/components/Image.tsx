import NextImage, * as NextImageAll from "next/image";
import React from "react";

const Image: React.FC<NextImageAll.ImageProps> = ({
  ...props
}) => {
  const isClient = typeof window !== 'undefined';
  let origin = isClient ? window.location.origin : '';
  if (!isClient) {
    origin = process.env.NODE_ENV === "production" ? 'http://localhost:4000' : 'http://localhost:3000';
  }

  function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number; }) {
    return `${origin}${src}?w=${width}&q=${quality || 75}`
  }

  return <NextImage {...props} loader={isClient ? imageLoader : imageLoader} />;
}

export default Image;
