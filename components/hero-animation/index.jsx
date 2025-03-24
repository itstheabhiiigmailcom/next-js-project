'use client';
import { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import './index.scss';

const HeroAnimation = ({
  backgroundImage,
  floatingImage,
  className = 'h-[200vh] bg-black',
  floatingClassName = '',
}) => {
  const parentRef = useRef(null);
  const bgRef = useRef(null);
  const floatingRef = useRef(null);
  const initialBgScale = 1.5;

  useEffect(() => {
    const parent = parentRef.current;
    const bg = bgRef.current;
    const floatingElement = floatingRef.current;

    if (!parent || !bg || !floatingElement) return;

    const handleScroll = () => {
      const parentRect = parent.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, -parentRect.top / (parentRect.height / 2)),
      );

      // Floating element animation
      const rotation = scrollProgress * 180;
      const scale = 2 + scrollProgress * 1.5;
      const translateY = -(scrollProgress * 250);
      const opacity = scrollProgress < 1 ? 1 : 1 - (scrollProgress - 1) * 5;

      floatingElement.style.transform = `translate(-50%, ${translateY}%) rotate(${rotation}deg) scale(${scale})`;
      floatingElement.style.opacity = opacity;

      // Background opacity animation
      const bgOpacity = 1 - scrollProgress;
      const bgScale = initialBgScale - scrollProgress * 0.5;
      bg.style.transform = `scale(${bgScale})`;
      bg.style.opacity = bgOpacity;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={parentRef} className={cn('hero-animation relative', className)}>
      <div className="sticky top-0 h-[50%] overflow-hidden">
        <div
          ref={bgRef}
          className="background-image absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: `scale(${initialBgScale})`,
          }}
        />
        <div
          ref={floatingRef}
          className={cn(
            'floating-element absolute top-1/2 left-1/2 bg-contain bg-center bg-no-repeat',
            floatingClassName,
          )}
          style={{
            backgroundImage: `url(${floatingImage})`,
            transform: `translate(-50%, -50%) rotate(0deg) scale(2)`,
            opacity: 1,
          }}
        />
      </div>
    </div>
  );
};

export default HeroAnimation;
