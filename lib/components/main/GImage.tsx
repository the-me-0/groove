'use client';

import Image from 'next/image';
import React, { forwardRef, ReactElement } from 'react';

interface Props {
  src: string | HTMLImageElement,
  alt: string
}

const GImage = forwardRef((props: Props, ref): ReactElement => {
  return (
    <Image src={props.src} alt={props.alt} className="object-cover" fill unoptimized ref={ref as any} />
  );
});
GImage.displayName = 'GImage';

export { GImage };