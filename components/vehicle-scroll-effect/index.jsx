'use client';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/utils/cn';
import './index.scss';

const VehicleScrollEffect = ({
  floatingImgScaleFactor = 2.5,
  backgroundImage,
  floatingImg,
  className = '',
  floatingImgClassName = '',
  leftWheel = '/vehicle-scroll-effect/left-wheel-new.png',
  rightWheel = '/vehicle-scroll-effect/right-wheel-new.png',
}) => {
  const parentRef = useRef(null);
  const backgroundRef = useRef(null);
  const carRef = useRef(null);
  const wheelFrontRef = useRef(null);
  const wheelBackRef = useRef(null);
  const [initialTop, setInitialTop] = useState(null);
  const [scrollDirection, setScrollDirection] = useState(null);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null); // Timeout to detect scroll stop

  useEffect(() => {
    const floatingElement = carRef.current;
    if (!floatingElement) return;

    const topMatch = floatingImgClassName.match(/top-\[(\d+)%\]/);
    if (topMatch) {
      setInitialTop(parseFloat(topMatch[1]));
    }
  }, [floatingImgClassName]);

  useEffect(() => {
    const parent = parentRef.current;
    const floatingElement = carRef.current;
    const wheelFront = wheelFrontRef.current;
    const wheelBack = wheelBackRef.current;

    if (!parent || !floatingElement || !wheelFront || !wheelBack) return;

    const handleScroll = () => {
      const parentRect = parent.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, -parentRect.top / (parentRect.height / 1.2)),
      );

      // Determine scroll direction
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;

      // Car Scaling
      const carScale = 1 + scrollProgress * floatingImgScaleFactor;
      const topPos = initialTop + scrollProgress * 10;

      floatingElement.style.top = `${topPos}%`;
      floatingElement.style.transform = `scale(${carScale})`;

      // Ensure wheels remain the same size
      // wheelFront.style.transform = 'scale(1)';
      // wheelBack.style.transform = 'scale(1)';

      // Apply animation based on scroll direction
      if (scrollDirection === 'down') {
        wheelFront.classList.add('wheel-rotate');
        wheelFront.classList.remove('wheel-reverse');
        wheelBack.classList.add('wheel-rotate');
        wheelBack.classList.remove('wheel-reverse');
      } else if (scrollDirection === 'up') {
        wheelFront.classList.add('wheel-reverse');
        wheelFront.classList.remove('wheel-rotate');
        wheelBack.classList.add('wheel-reverse');
        wheelBack.classList.remove('wheel-rotate');
      }

      // Clear the previous timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set a new timeout to detect when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        wheelFront.classList.remove('wheel-rotate', 'wheel-reverse');
        wheelBack.classList.remove('wheel-rotate', 'wheel-reverse');
        setScrollDirection(null); // Reset scroll direction
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [initialTop, scrollDirection, floatingImgScaleFactor]);

  return (
    <div
      ref={parentRef}
      className={cn('vehicle-scroll-effect relative', className)}
    >
      <div className="sticky top-0 h-[50%] max-h-dvh overflow-hidden">
        {/* Background Image */}
        <div
          ref={backgroundRef}
          className="background-image absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />

        {/* Vehicle Image */}
        <div
          ref={carRef}
          className={cn(
            'floating-element absolute -translate-x-1/2 bg-contain bg-center bg-no-repeat',
            floatingImgClassName,
          )}
          style={{
            width: '312px',
            height: '212px',
            backgroundImage: `url(${floatingImg})`,
            opacity: 1,
          }}
        >
          {/* Front Wheel */}
          <div
            ref={wheelFrontRef}
            className="absolute bg-contain bg-no-repeat"
            style={{
              backgroundImage: `url(${leftWheel})`,
              width: '9%',
              height: '19%',
              top: '56%',
              left: '27.3%',
              transformOrigin: 'center center',
              transform: 'rotateZ(-2deg)',
            }}
          />

          {/* Rear Wheel */}
          <div
            ref={wheelBackRef}
            className="absolute bg-contain bg-no-repeat"
            style={{
              backgroundImage: `url(${rightWheel})`,
              width: '9%',
              height: '18%',
              top: '56%',
              left: '66.7%',
              transformOrigin: 'center center',
              transform: 'rotateX(3deg) rotateY(0deg) rotateZ(0deg)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleScrollEffect;
