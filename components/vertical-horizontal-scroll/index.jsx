'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function VerticalHorizontalScroll() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFullyScrolled, setIsFullyScrolled] = useState(false);
  const [dimensions, setDimensions] = useState({
    windowHeight: 0,
    windowWidth: 0,
  });

  useEffect(() => {
    setDimensions({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    });
  }, []);

  const sections = [
    {
      title: 'Innovative Design',
      description:
        'Our approach combines cutting-edge aesthetics with functional design principles, creating spaces that are both beautiful and practical.',
      image: '/vertical-horizontal-scroll/alfred-1.png?height=400&width=600',
      containerBg: '/vertical-horizontal-scroll/S3_1.webp',
      color: 'bg-neutral-500 dark:bg-neutral-500',
      textColor: 'text-rose-50 dark:text-rose-100',
    },
    {
      title: 'Sustainable Solutions',
      description:
        "We believe in creating solutions that not only solve today's problems but also consider the impact on future generations.",
      image: '/vertical-horizontal-scroll/alfred-2.png?height=400&width=600',
      color: 'bg-neutral-500 dark:bg-neutral-500',
      containerBg: '/vertical-horizontal-scroll/S3_1.webp',
      textColor: 'text-amber-50 dark:text-amber-100',
    },
    {
      title: 'Digital Transformation',
      description:
        'Embracing the digital age means constantly evolving and adapting to new technologies that reshape how we interact with the world.',
      image: '/vertical-horizontal-scroll/alfred-3.png?height=400&width=600',
      containerBg: '/vertical-horizontal-scroll/S3_2.webp',
      color: 'bg-neutral-500 dark:bg-neutral-500',
      textColor: 'text-amber-50 dark:text-amber-100',
    },
    {
      title: 'Creative Collaboration',
      description:
        'The best ideas emerge when diverse perspectives come together, challenging assumptions and pushing boundaries.',
      image: '/vertical-horizontal-scroll/alfred-4.png?height=400&width=600',
      containerBg: '/vertical-horizontal-scroll/S3_3.webp',
      color: 'bg-neutral-500 dark:bg-neutral-500',
      textColor: 'text-amber-50 dark:text-amber-100',
    },
    {
      title: 'Future Vision',
      description:
        "We're not just building for today—we're anticipating the needs and challenges of tomorrow to create lasting impact.",
      image: '/vertical-horizontal-scroll/alfred-5.png?height=400&width=600',
      containerBg: '/vertical-horizontal-scroll/S3_1.webp',
      color: 'bg-neutral-500 dark:bg-neutral-500',
      textColor: 'text-amber-50 dark:text-amber-100',
    },
  ];

  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || dimensions.windowHeight === 0) return;

    // Calculate total scroll height with a fixed ratio to ensure enough scroll space
    // First screen (intro) + horizontal scroll section + buffer space
    const introHeight = dimensions.windowHeight;
    const horizontalScrollHeight =
      dimensions.windowHeight * (sections.length + 0.5);
    const bufferHeight = dimensions.windowHeight;

    const totalScrollHeight =
      introHeight + horizontalScrollHeight + bufferHeight;
    container.style.height = `${totalScrollHeight}px`;

    const handleScroll = () => {
      if (!container || !horizontalRef.current) return;

      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;

      // Calculate how far we've scrolled into the container
      const scrollIntoContainer = -containerTop;

      // The point where horizontal scrolling should start (after the intro screen)
      const horizontalStartPoint = introHeight;

      // Calculate progress only when we're in the horizontal scroll section
      if (scrollIntoContainer >= horizontalStartPoint) {
        // How much we've scrolled past the start point
        const extraScroll = scrollIntoContainer - horizontalStartPoint;

        // The maximum amount we need to scroll to complete the horizontal section
        // We use the horizontal scroll height minus one viewport height to ensure
        // the last section is fully visible before we reach the end
        const maxExtraScroll = horizontalScrollHeight - dimensions.windowHeight;

        // Calculate progress as a value between 0 and 1
        const progress = Math.min(Math.max(extraScroll / maxExtraScroll, 0), 1);

        setScrollProgress(progress);
        setIsFullyScrolled(progress >= 0.99);
      } else {
        setScrollProgress(0);
        setIsFullyScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [dimensions, sections.length]);

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical scrolling section */}
      <div className="sticky top-0 h-screen w-full">
        <div className="flex h-screen w-full flex-col items-center justify-center p-8 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">
            Scroll Down to Explore Alfred
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg md:text-xl">
            A robotic who takes orders and serves food to customers in a
            restaurant
          </p>
          <div className="mt-8 animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-8"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Enhanced Horizontal scrolling section */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          ref={horizontalRef}
          className="flex h-full transition-transform duration-100"
          style={{
            transform: `translateX(-${scrollProgress * (100 - 100 / sections.length)}%)`,
            width: `${sections.length * 100}%`,
          }}
        >
          {sections.map((section, index) => (
            <div
              key={index}
              className={`h-full w-full flex-shrink-0 ${section.color} flex flex-col items-center justify-center p-6 md:flex-row md:p-12`}
              style={{ width: `${100 / sections.length}%` }}
            >
              <div className="flex w-full flex-col justify-center p-6 md:w-1/2 md:p-12">
                <h2
                  className={`mb-6 text-3xl font-bold md:text-5xl ${section.textColor} transition-all duration-500 hover:scale-105`}
                >
                  {section.title}
                </h2>
                <p className={`text-lg md:text-xl ${section.textColor}`}>
                  {section.description}
                </p>
              </div>
              <div className="flex h-[60vh] w-full items-center justify-center p-6 md:w-1/3">
                <div
                  className="relative aspect-video h-full w-full max-w-md overflow-hidden rounded-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-lg transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] dark:border-black/20"
                  style={{
                    backgroundImage: `url(${section.containerBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Main image */}
                  <Image
                    src={section.image || '/placeholder.svg'}
                    alt={section.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      {scrollProgress > 0 && !isFullyScrolled && (
        <div className="fixed bottom-8 left-1/2 z-50 h-1 w-64 -translate-x-1/2 transform overflow-hidden rounded-full bg-gray-200/50 backdrop-blur-sm">
          <div
            className="h-full rounded-full bg-gray-800"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      )}

      {/* Spacer - ensures there's enough scroll space at the end */}
      <div
        className="pointer-events-none sticky top-0 h-screen"
        style={{
          opacity: isFullyScrolled ? 1 : 0,
          marginTop: `-${dimensions.windowHeight}px`,
        }}
      ></div>
    </div>
  );
}
