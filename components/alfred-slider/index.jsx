'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';

export default function AlfredScroll({
  robotImage = '/alfred-slider/alfred-1.png',
  robotWidth = 300,
  robotHeight = 300,
  backgroundImage = '/alfred-slider/S3_1.webp?height=1280&width=1920',
  firstSectionHeading = 'Scroll Down to See Cards',
  firstSectionHeadingClassName = '',
  secondSectionHeading = 'Discover Hiking Gear',
  secondSectionHeadingClassName = '',
  secondSectionSubheading = "That's Built to Perform",
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
      headingClassName: 'p-2',
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
  const [isMobile, setIsMobile] = useState();
  const [isSmallDevice, setIsSmallDevice] = useState();
  const [isFullyVisible, setIsFullyVisible] = useState(false);
  const [firstSecAbsolute, setFirstSecAbsolute] = useState(false);
  const [secondSecAbsolute, setSecondSecAbsolute] = useState(false);
  const [isSecondSectionVisible, setIsSecondSectionVisible] = useState(false);
  const secondSectionRef = useRef(null);
  const componentRef = useRef(null);
  const firstSectionRef = useRef(null);

  // Card height configuration
  const cardHeights = {
    mobile: {
      main: 'h-[300px]',
      others: 'h-[250px]',
    },
    desktop: {
      main: 'h-[320px]',
      others: 'h-64',
    },
  };

  // Animation classes based on visibility
  const getCardAnimationClasses = (cardType) => {
    if (!cardsVisible) {
      if (isMobile) {
        return cardType === 'main'
          ? 'scale-75 opacity-0'
          : cardType === 'left'
            ? '-translate-y-full scale-50 opacity-0'
            : 'translate-y-full scale-50 opacity-0';
      } else {
        return cardType === 'main'
          ? 'scale-75 opacity-0'
          : cardType === 'left'
            ? '-translate-x-full scale-50 opacity-0'
            : 'translate-x-full scale-50 opacity-0';
      }
    }

    return cardType === 'main'
      ? 'scale-100 opacity-100'
      : `scale-100 opacity-100 ${!isMobile ? (cardType === 'left' ? '-rotate-y-5' : 'rotate-y-5') : ''}`;
  };

  // Shadow classes based on visibility and card type
  const getCardShadowClasses = (cardType) => {
    if (!cardsVisible) return 'shadow-none';

    if (isMobile) {
      return 'shadow-[0_10px_25px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)';
    } else {
      return cardType === 'main'
        ? 'shadow-[0_10px_25px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)]'
        : cardType === 'left'
          ? 'shadow-[8px_8px_15px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.5)]'
          : 'shadow-[-8px_8px_15px_rgba(0,0,0,0.2),5px_-5px_10px_rgba(255,255,255,0.5)]';
    }
  };

  useEffect(() => {
    const checkIfMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsSmallDevice(width < 500);
    };
    checkIfMobile();

    // Track if component is in view
    const component = componentRef.current;
    let isComponentInView = false;

    const checkComponentVisibility = () => {
      if (!component) return false;

      const rect = component.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Component is considered "in view" if any part of it is visible
      isComponentInView = rect.bottom > 0 && rect.top < viewportHeight;

      // Check if component is fully visible (taking up the entire viewport)
      const isFullyInView = rect.top <= 10 && rect.bottom >= viewportHeight;
      setIsFullyVisible(isFullyInView);

      return isComponentInView;
    };

    const updateScrollPosition = () => {
      if (!firstSectionRef.current || !secondSectionRef.current) return;

      // Update component visibility status
      checkComponentVisibility();

      const viewportHeight = window.innerHeight;
      const secondSection = secondSectionRef.current;

      const secondSectionTop = secondSection.getBoundingClientRect().top;
      const secondSectionVisibility = Math.max(
        0,
        Math.min(1, (viewportHeight - secondSectionTop) / viewportHeight),
      );

      setIsSecondSectionVisible(secondSectionVisibility > 0.5);

      const newScale = Math.max(0.4, 1 - secondSectionVisibility * 0.6);
      setScale(newScale);

      setFirstSecAbsolute(newScale >= 1);
      setSecondSecAbsolute(newScale <= 0.4);

      // Show cards when second section is at least 70% visible
      setCardsVisible(secondSectionVisibility >= 0.7);
    };

    // Auto-scroll logic - only runs when component is in view
    let isScrolling = false;
    let lastScrollPosition = window.scrollY;
    let scrollTimeout;

    const handleAutoScroll = () => {
      // Only proceed if component is in view
      if (!isComponentInView || isScrolling) return;

      const currentScrollPosition = window.scrollY;
      const scrollDirection =
        currentScrollPosition > lastScrollPosition ? 'down' : 'up';
      lastScrollPosition = currentScrollPosition;

      const firstSection = firstSectionRef.current;
      const secondSection = secondSectionRef.current;

      if (!firstSection || !secondSection) return;

      const firstRect = firstSection.getBoundingClientRect();
      const secondRect = secondSection.getBoundingClientRect();

      if (
        scrollDirection === 'down' &&
        firstRect.top < 0 &&
        firstRect.top > -firstRect.height
      ) {
        isScrolling = true;
        secondSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 100);
      } else if (
        scrollDirection === 'up' &&
        secondRect.top > 10 &&
        secondRect.top < secondRect.height - 350
      ) {
        isScrolling = true;
        firstSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 100);
      }
    };

    // Initial setup
    updateScrollPosition();

    // Throttle scroll events for better performance
    const throttle = (fn, wait) => {
      let time = Date.now();
      return () => {
        if (time + wait - Date.now() < 0) {
          fn();
          time = Date.now();
        }
      };
    };

    const throttledScroll = throttle(() => {
      updateScrollPosition();
      handleAutoScroll();
    }, 50);

    // Event listeners
    window.addEventListener('resize', checkIfMobile);
    window.addEventListener('scroll', throttledScroll);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Update your useEffect to measure the right card
  // useEffect(() => {
  //   const measureElements = () => {
  //     if (firstSectionRef.current) {
  //       setFirstSectionHeight(firstSectionRef.current.offsetHeight);
  //     }
  //     if (secondSectionRef.current) {
  //       // Measure right card height when cards are visible
  //       setSecondSectionHeight(secondSectionRef.current.offsetHeight);
  //       if (cardsVisible) {
  //         const rightCard = secondSectionRef.current.querySelector(
  //           '.card[data-type="right"]',
  //         );
  //         if (rightCard) {
  //           setRightCardHeight(rightCard.offsetHeight);
  //         }
  //       }
  //     }
  //   };

  //   // Initial measurement
  //   measureElements();

  //   // Re-measure on resize
  //   const resizeObserver = new ResizeObserver(measureElements);
  //   if (firstSectionRef.current)
  //     resizeObserver.observe(firstSectionRef.current);
  //   if (secondSectionRef.current) {
  //     resizeObserver.observe(secondSectionRef.current);
  //     const rightCard = secondSectionRef.current.querySelector(
  //       '.card[data-type="right"]',
  //     );
  //     if (rightCard) resizeObserver.observe(rightCard);
  //   }

  //   return () => resizeObserver.disconnect();
  // }, [cardsVisible]);

  // Update dynamic top calculation to handle both sections
  // const dynamicTop = isMobile
  //   ? firstSecAbsolute
  //     ? `${firstSectionHeight - robotHeight / 2}px` // Position relative to first section
  //     : secondSecAbsolute
  //       ? `${firstSectionHeight + secondSectionHeight - rightCardHeight - 247}px` // Position relative to second section
  //       : undefined
  //   : undefined;

  console.log('secondSectionVisible : ', isSecondSectionVisible);

  return (
    <div className="alfred-scroll relative w-full" ref={componentRef}>
      <div
        className={`robot pointer-events-none ${
          isFullyVisible
            ? isSmallDevice
              ? !secondSecAbsolute
                ? 'sticky top-[495px]' // Adjusted for small devices
                : 'absolute top-[1170px]' // Adjusted for small devices
              : isMobile
                ? !secondSecAbsolute
                  ? 'sticky top-[468px]'
                  : 'absolute top-[1140px]'
                : isSecondSectionVisible
                  ? 'sticky top-[340px]'
                  : 'sticky top-[450px]'
            : isSmallDevice
              ? firstSecAbsolute
                ? 'absolute top-[468px]' // Small device first section absolute
                : 'absolute top-[1170px]' // Default for small devices
              : isMobile
                ? firstSecAbsolute
                  ? 'absolute top-[28%]'
                  : 'absolute top-[70%]'
                : firstSecAbsolute
                  ? 'absolute top-[450px]'
                  : 'absolute top-[74%]'
        } left-0 z-10 flex w-full items-center justify-center`}
        style={{
          height: 0,
        }}
      >
        <Image
          src={robotImage || '/placeholder.svg'}
          alt="Robot"
          width={robotWidth}
          height={robotHeight}
          className={`robot-image h-[450px] w-auto translate-y-0 scale-100 rotate-0 opacity-100 transition-transform duration-700 ease-out`}
          style={{ transform: `scale(${scale})` }}
          priority
        />
      </div>

      <section
        ref={firstSectionRef}
        className={`first-section relative h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          filter: 'brightness(0.7)',
        }}
      >
        <h1
          className={cn(
            'mt-16 px-4 text-center text-6xl font-extrabold md:text-7xl lg:text-8xl',
            'bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent',
            'drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)] lg:drop-shadow-[6px_6px_0px_rgba(0,0,0,0.6)]',
            firstSectionHeadingClassName,
          )}
        >
          {firstSectionHeading}
        </h1>
      </section>

      <section
        ref={secondSectionRef}
        className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200"
      >
        <div className="mb-12 px-4 text-center">
          <h2 className={cn('font-bold', secondSectionHeadingClassName)}>
            {secondSectionHeading}
          </h2>
          <h3 className={cn('font-bold', secondSectionSubheadingClassName)}>
            {secondSectionSubheading}
          </h3>
        </div>

        <div
          className={`relative flex w-full items-center justify-center overflow-hidden px-4 ${
            isMobile ? 'flex-col space-y-8' : 'space-x-16'
          }`}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              data-type={card.type}
              className={cn(
                `card z-0 mb-2 flex ${
                  isMobile
                    ? `${
                        card.type === 'left'
                          ? 'order-first' // Left card comes first
                          : card.type === 'main'
                            ? 'order-2' // Main card comes second
                            : 'order-3' // Right card comes last
                      } w-full max-w-sm ${card.type === 'main' ? cardHeights.mobile.main : cardHeights.mobile.others}`
                    : `${card.type === 'left' ? 'order-1' : card.type === 'main' ? 'order-2' : 'order-3'} ${
                        card.type === 'main'
                          ? cardHeights.desktop.main
                          : cardHeights.desktop.others
                      } ${card.type === 'main' ? 'w-64' : 'w-56'}`
                }`,
                'flex-col items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 p-4 text-center',
                getCardAnimationClasses(card.type),
                getCardShadowClasses(card.type),
                'perspective-1000',
              )}
            >
              {/* Card content remains the same */}
              {card.image && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 transform">
                  <Image
                    src={card.image || '/placeholder.svg'}
                    alt="Robot"
                    width={card.imageWidth || 80}
                    height={card.imageHeight || 80}
                    className="h-30 w-30"
                  />
                </div>
              )}
              <div className={`${isMobile ? 'mt-24' : 'mt-28'} text-center`}>
                <h3 className={cn('text-lg', card.headingClassName)}>
                  {card.heading}
                </h3>
                <p className={`text-sm ${card.paraClassName}`}>{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
