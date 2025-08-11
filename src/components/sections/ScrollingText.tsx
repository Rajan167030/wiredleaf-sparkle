"use client";

import { useEffect, useRef } from 'react';

export const ScrollingText = () => {
  const firstTextRef = useRef<HTMLDivElement>(null);
  const secondTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firstText = firstTextRef.current;
    const secondText = secondTextRef.current;

    if (!firstText || !secondText) return;

    // First text scroll
    const scrollFirst = () => {
      if (firstText.scrollLeft >= firstText.scrollWidth / 2) {
        firstText.scrollLeft = 0;
      } else {
        firstText.scrollLeft += 1; // Moderate scroll speed
      }
    };

    // Second text scroll
    const scrollSecond = () => {
      if (secondText.scrollLeft <= 0) {
        secondText.scrollLeft = secondText.scrollWidth / 2;
      } else {
        secondText.scrollLeft -= 1; // Moderate scroll speed
      }
    };

    const firstInterval = setInterval(scrollFirst, 20); // Moderate timing
    const secondInterval = setInterval(scrollSecond, 20); // Moderate timing

    return () => {
      clearInterval(firstInterval);
      clearInterval(secondInterval);
    };
  }, []);

  return (
    <div className="w-full bg-background/50 py-32 overflow-hidden">
      {/* Container for intersection */}
      <div className="relative h-32"> {/* Fixed height container for better intersection */}
        {/* First line */}
        <div className="absolute inset-0 -rotate-12 z-20"> {/* Increased rotation and z-index */}
          <div
            ref={firstTextRef}
            className="overflow-hidden whitespace-nowrap"
            style={{ width: '200%' }}
          >
            <span className="inline-block text-6xl font-bold tracking-wider px-4 mx-4"
              style={{
                background: 'linear-gradient(to right, #3b82f6, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(59, 130, 246, 0.2)'
              }}>
              INNOVATE • CREATE • TRANSFORM • EXCELLENCE • FUTURE •&nbsp;
            </span>
            <span className="inline-block text-6xl font-bold tracking-wider px-4 mx-4"
              style={{
                background: 'linear-gradient(to right, #3b82f6, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(59, 130, 246, 0.2)'
              }}>
              INNOVATE • CREATE • TRANSFORM • EXCELLENCE • FUTURE •&nbsp;
            </span>
          </div>
        </div>

        {/* Second line */}
        <div className="absolute inset-0 rotate-12 z-10"> {/* Increased rotation */}
          <div
            ref={secondTextRef}
            className="overflow-hidden whitespace-nowrap"
            style={{ width: '200%' }}
          >
            <span className="inline-block text-6xl font-bold tracking-wider px-4 mx-4"
              style={{
                background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(139, 92, 246, 0.2)'
              }}>
              DESIGN • DEVELOP • DELIVER • INNOVATE • SUCCESS •&nbsp;
            </span>
            <span className="inline-block text-6xl font-bold tracking-wider px-4 mx-4"
              style={{
                background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(139, 92, 246, 0.2)'
              }}>
              DESIGN • DEVELOP • DELIVER • INNOVATE • SUCCESS •&nbsp;
            </span>
          </div>
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent z-30" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent z-30" />
    </div>
  );
};
