'use client';
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/utils/cn';
import './index.scss';

const VideoScrollEffect = ({
  videoSrc,
  className = '',
  videoClassName = '',
  children,
  childrenClassName = 'px-4 text-black drop-shadow-md md:px-8 lg:px-16',
  thresholdView = 0.5,
}) => {
  const parentRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoBlur, setVideoBlur] = useState(0); // Blur value in pixels

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleObserver = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        video.play().catch((err) => console.warn('Autoplay prevented:', err));
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      threshold: thresholdView,
    });

    observer.observe(video);

    return () => observer.disconnect();
  }, [thresholdView]);

  useEffect(() => {
    const parent = parentRef.current;
    const content = contentRef.current;
    if (!parent || !content) return;

    const totalChildren = React.Children.count(children);

    const handleScroll = () => {
      const parentRect = parent.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, -parentRect.top / (parentRect.height - window.innerHeight)),
      );

      const childHeight = 1 / totalChildren;

      let maxVisibility = 0;
      for (let i = 0; i < content.children.length; i++) {
        const child = content.children[i];
        const childStart = i * childHeight;
        const childEnd = (i + 1) * childHeight;

        let visibilityProgress =
          (scrollProgress - childStart) / (childEnd - childStart);

        if (visibilityProgress < 0) visibilityProgress = 0;
        if (visibilityProgress > 1) visibilityProgress = 1;

        maxVisibility = Math.max(maxVisibility, visibilityProgress);

        // Smooth fade-in effect for text
        const fadeOutStart = 0.2;
        const fadeOutEnd = 0.8;

        let opacity;
        if (visibilityProgress < fadeOutStart) {
          opacity = visibilityProgress / fadeOutStart;
        } else if (visibilityProgress > fadeOutEnd) {
          opacity = (1 - visibilityProgress) / (1 - fadeOutEnd);
        } else {
          opacity = 1;
        }

        const translateY = (1 - visibilityProgress) * 30;

        child.style.opacity = opacity;
        child.style.transform = `translateY(${translateY}px)`;
      }

      // Increase blur effect as content becomes visible
      setVideoBlur(maxVisibility * 10); // Max blur = 10px
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [children]);

  return (
    <div
      ref={parentRef}
      className={cn('video-scroll-effect relative', className)}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {isLoading && (
          <div className="shimmer-effect absolute inset-0 transition-opacity duration-500"></div>
        )}

        <video
          ref={videoRef}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-all duration-500',
            videoClassName,
          )}
          style={{ filter: `blur(${videoBlur}px)` }} // Apply dynamic blur
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsLoading(false)}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Over the Video */}
      <div
        ref={contentRef}
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center',
          childrenClassName,
        )}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="child-content flex h-screen items-center justify-center text-center text-2xl leading-snug font-bold drop-shadow-lg"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoScrollEffect;
