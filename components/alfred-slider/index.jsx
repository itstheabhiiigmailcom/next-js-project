'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import './index.scss';

export default function AlfredScroll({
  robotImage = '/alfred-slider/alfred-1.png', // Default robot image
  robotWidth = 300, // Default robot width
  robotHeight = 300, // Default robot height
  backgroundImage = '/alfred-slider/S3_1.webp?height=1280&width=1920', // Default background image
  firstSectionHeading = 'Scroll Down to See Cards', // Default first section heading
  firstSectionHeadingClassName = '',
  secondSectionHeading = 'Discover Hiking Gear', // Default second section heading,
  secondSectionHeadingClassName = '',
  secondSectionSubheading = "That's Built to Perform", // Default second section subheading,
  secondSectionSubheadingClassName = '',
  cards = [
    {
      type: 'left',
      heading: 'Left Card',
      text: 'This card emerges from the left with a slight delay.',
      image: '/alfred-slider/alfred-1.png',
      imageWidth: 100,
      imageHeight: 100,
      headingClassName: '',
      paraClassName: '',
    },
    {
      type: 'main',
      heading: 'Main Card',
      text: 'This is the main card that appears first in the animation sequence.',
      headingClassName: '',
      paraClassName: '',
    },
    {
      type: 'right',
      heading: 'Right Card',
      text: 'This card emerges from the right with a longer delay for a sequential effect.',
      image: '/alfred-slider/alfred-1.png',
      imageWidth: 100,
      imageHeight: 100,
      headingClassName: '',
      paraClassName: '',
    },
  ],
}) {
  const [cardsVisible, setCardsVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const [topPosition, setTopPosition] = useState('100%');
  const secondSectionRef = useRef(null);
  const componentRef = useRef(null);
  const firstSectionRef = useRef(null);

  // Debounce function to limit scroll event frequency
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (firstSectionRef.current && secondSectionRef.current) {
        const firstSection = firstSectionRef.current;
        const secondSection = secondSectionRef.current;

        // Batch DOM reads for performance
        const firstSectionTop = firstSection.getBoundingClientRect().top;
        const secondSectionTop = secondSection.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        // Calculate scroll progress for the first section (0 to 1)
        const firstSectionProgress = Math.max(
          0,
          Math.min(1, (viewportHeight - firstSectionTop) / viewportHeight),
        );

        // Adjust top position based on first section scroll progress
        let newTopPosition = '100%';
        if (firstSectionProgress >= 0.5) {
          const adjustedProgress = (firstSectionProgress - 0.5) / 0.5;
          newTopPosition = `${95 - adjustedProgress * 55}%`;
        }

        // Calculate scroll progress for the second section (0 to 1)
        const secondSectionProgress = Math.max(
          0,
          Math.min(1, (viewportHeight - secondSectionTop) / viewportHeight),
        );

        // Scale down the robot image based on second section scroll progress
        const newScale = Math.max(0.4, 1 - secondSectionProgress * 0.6);

        // Batch DOM writes using requestAnimationFrame for smooth updates
        animationFrameId = requestAnimationFrame(() => {
          setTopPosition(newTopPosition);
          setScale(newScale);
        });
      }
    };

    // Debounce the scroll handler to improve performance
    const debouncedHandleScroll = debounce(handleScroll, 10);

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger animations when 50% of the second section is visible
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setCardsVisible(true);
          } else {
            setCardsVisible(false);
          }
        });
      },
      { threshold: 0.5 }, // Trigger when 50% of the section is visible
    );

    if (secondSectionRef.current) {
      observer.observe(secondSectionRef.current);
    }

    return () => {
      if (secondSectionRef.current) {
        observer.unobserve(secondSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="alfred-scroll relative w-full" ref={componentRef}>
      {/* Robot image that scales and moves based on scroll progress */}
      <div
        className="robot pointer-events-none sticky left-[38%] z-999 flex h-[85vh] justify-center"
        style={{ top: topPosition }} // Dynamically update top position
      >
        <Image
          src={robotImage}
          alt="Robot"
          width={robotWidth}
          height={robotHeight}
          className="h-[450px] w-auto transition-transform duration-200"
          style={{ transform: `scale(${scale})` }}
          priority
        />
      </div>

      {/* First section with background */}
      <section
        ref={firstSectionRef}
        className="relative -mt-150 h-screen w-full overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            filter: 'brightness(0.7)',
          }}
        />
        <div className="absolute inset-0 flex items-start justify-center pt-20">
          <h1 className={cn('font-bold', firstSectionHeadingClassName)}>
            {firstSectionHeading}
          </h1>
        </div>
      </section>

      {/* Second section with cards */}
      <section
        ref={secondSectionRef}
        className="relative flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 py-12"
      >
        <div className="mb-12 text-center">
          <h2 className={cn('font-bold', secondSectionHeadingClassName)}>
            {secondSectionHeading}
          </h2>
          <h3 className={cn('font-bold', secondSectionSubheadingClassName)}>
            {secondSectionSubheading}
          </h3>
        </div>
        <div className="relative flex w-full max-w-6xl items-center justify-center px-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`card z-10 mx-4 flex h-72 w-56 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 p-6 text-center shadow-lg transition-all duration-500 ease-out hover:shadow-xl ${
                cardsVisible
                  ? 'translate-x-0 scale-100 opacity-100'
                  : card.type === 'left'
                    ? '-translate-x-full scale-50 opacity-0'
                    : card.type === 'right'
                      ? 'translate-x-full scale-50 opacity-0'
                      : 'scale-75 opacity-0'
              }`}
              style={{
                transform: cardsVisible
                  ? `translate3d(0, 0, 0) rotateY(${
                      card.type === 'left'
                        ? '-5deg'
                        : card.type === 'right'
                          ? '5deg'
                          : '0deg'
                    })`
                  : card.type === 'left'
                    ? 'translate3d(-100%, 0, 0) rotateY(-5deg) scale(0.5)'
                    : card.type === 'right'
                      ? 'translate3d(100%, 0, 0) rotateY(5deg) scale(0.5)'
                      : 'translate3d(0, 0, 0) scale(0.75)',
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              {/* Robot image in the middle top */}
              {card.image && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 transform">
                  <Image
                    src={card.image}
                    alt="Robot"
                    width={card.imageWidth || 100}
                    height={card.imageHeight || 100}
                    className="h-24 w-24"
                  />
                </div>
              )}
              {/* Text (heading + paragraph) */}
              <div className="mt-28 text-center">
                <h3 className={cn(card.headingClassName)}>{card.heading}</h3>
                <p className={`${card.paraClassName}`}>{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
