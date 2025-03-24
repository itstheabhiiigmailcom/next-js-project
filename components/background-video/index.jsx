'use client';
import './index.scss';
import { cn } from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';

export const BackgroundVideo = ({
  className = 'h-[700px] w-full bg-black',
  videoUrl,
  thresholdView = 0.5,
  childrenClassName = 'flex items-center justify-center text-white',
  children,
}) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleObserver = (entries) => {
      const entry = entries[0];

      if (video) {
        if (entry.isIntersecting) {
          video.play().catch((err) => console.warn('Autoplay prevented:', err));
        } else {
          video.pause();
        }
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      threshold: thresholdView,
    });

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [thresholdView]);

  return (
    <div className={cn('relative', className)}>
      {/* Video Wrapper - Ensures it stays inside the container */}
      <div className="relative size-full overflow-hidden">
        {/* Gray Background while Loading */}
        {isLoading && (
          <div className="shimmer-effect absolute inset-0 transition-opacity duration-500"></div>
        )}

        {/* Background Video (Inside the Wrapper) */}
        <video
          ref={videoRef}
          src={videoUrl}
          className={`h-full w-full object-cover opacity-80 blur-[1px] transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoading(false)}
        />
      </div>

      {/* Overlay Content */}
      <div className={cn('absolute inset-0 z-1', childrenClassName)}>
        {children}
      </div>
    </div>
  );
};
