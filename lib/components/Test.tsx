'use client';

import React, {useEffect, useRef, useState} from 'react';

export const Test = () => {
  const [progress, setProgress] = useState(20);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      const handleScroll = (event: WheelEvent) => {
        event.preventDefault(); // Empêche le défilement de la page
        const delta = event.deltaY;

        setProgress((prevValue) => {
          if (delta > 0) {
            return Math.min(prevValue + 1, 100); // Scroll vers le bas diminue la valeur
          } else {
            return Math.max(prevValue - 1, 0); // Scroll vers le haut augmente la valeur
          }
        });
      };

      // Ajout de l'écouteur d'événement avec `passive: false`
      scrollContainer.addEventListener('wheel', handleScroll, { passive: false });

      // Nettoyage lors du démontage du composant
      return () => {
        scrollContainer.removeEventListener('wheel', handleScroll);
      };
    }
  }, []);

  return (
    <div
      className='absolute top-1/2 left-1/2 flex-col gap-4 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-black flex justify-center items-center overflow-hidden'>
      scroll on the progress radius...

      {/* @ts-ignore */}
      <div ref={scrollContainerRef} className='radial-progress' style={{"--value": progress}} role='progressbar'>
        {progress}%
      </div>
    </div>
  );
}
