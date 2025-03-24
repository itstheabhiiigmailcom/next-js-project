'use client';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import Image from 'next/image';

const ImageRotation = ({ className, image, threshold = 0.5 }) => {
  const imageRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Check if the image is in the viewport
  useEffect(() => {
    const element = imageRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold]);

  return (
    <div
      className="image-rotation flex h-screen items-center justify-center bg-gray-900"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-[12px] border border-gray-600 bg-gray-200/30',
          className,
        )}
      >
        <div
          ref={imageRef}
          className={`image-container relative h-full w-full cursor-pointer transition-transform duration-700 ease-in-out ${isInView ? 'rotate-[15deg] rotate-x-[15deg] rotate-y-[-15deg]' : ''} hover:rotate-0 hover:rotate-x-0 hover:rotate-y-0`}
        >
          <Image
            src={image}
            alt="Animated Image"
            fill
            objectFit="cover"
            className="rounded-[12px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageRotation;
