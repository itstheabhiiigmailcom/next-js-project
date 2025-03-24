'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Slider = ({
  images,
  showLeftArrow = true,
  showRightArrow = true,
  showSliderNavigation = true,
  totalDots = 6,
  autoplay = true,
  autoplayInterval = 2000,
  pauseOnHover = true,
  transitionDuration = 1000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);


  useEffect(() => {
    if (!autoplay || (pauseOnHover && isHovered)) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images?.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, pauseOnHover, isHovered, images?.length]);

  if (!images?.length) return null;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  

  let start = Math.max(0, currentIndex - Math.floor(totalDots / 2));
  let end = start + totalDots;

  if (end > images.length) {
    end = images.length;
    start = Math.max(0, end - totalDots);
  }

  const dots = images.slice(start, end);

  return (
    <div
      className="relative mx-auto flex h-full w-full items-center justify-center overflow-hidden"
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
    >
      {/* Image Slider */}
      <div className="relative flex h-full w-full items-center justify-center">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={prevSlide}
            className="group/left-arrow absolute left-5 z-10 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-white transition-all hover:bg-gray-200 sm:h-[36px] sm:w-[36px] md:h-[40px] md:w-[40px] lg:h-[44px] lg:w-[44px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="group-hover/left-arrow:text-primary size-2/3 transition-transform hover:scale-110"
            >
              <g id="main">
                <path d="m15.54 21.56-.93.94-9.1-9.32a1.71 1.71 0 0 1 0-2.36l9.1-9.32.93.94-9.09 9.32a.34.34 0 0 0 0 .48z" />
              </g>
            </svg>
          </button>
        )}

        {/*Images*/}
            <div
            className="flex w-full h-full transition-transform ease-in-out"
            style={{
              transform: `translate3d(-${100*currentIndex}%, 0, 0)`,
              transitionDuration: `${transitionDuration}ms`,
            }}
          >
            {images.map((image, index) => (
              <div key={index} className="relative w-full h-full flex-shrink-0">
                <Image src={image} alt={`Slide ${index}`} className="object-cover" fill loading="lazy" />
              </div>
            ))}
          </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={nextSlide}
            className="group/right-arrow absolute right-5 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-white transition-all hover:bg-gray-200 sm:h-[36px] sm:w-[36px] md:h-[40px] md:w-[40px] lg:h-[44px] lg:w-[44px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="group-hover/right-arrow:text-primary transition-transform hover:scale-110 size-2/3"
            >
              <g id="main">
                <path d="M19 12a1.73 1.73 0 0 1-.47 1.18l-9.1 9.32-.93-.94 9.09-9.32a.34.34 0 0 0 0-.48L8.5 2.44l.93-.94 9.1 9.32A1.7 1.7 0 0 1 19 12" />
              </g>
            </svg>
          </button>
        )}
      </div>

      {showSliderNavigation && (
        <div
          className="absolute bottom-5 left-1/2 flex h-[22px] items-center justify-center rounded-full bg-white px-4 shadow-md md:h-[24px] lg:h-[30px]"
          style={{ width: 'fit-content', transform: 'translateX(-50%)' }}
        >
          {dots.map((_, index) => {
            const actualIndex = start + index;
            return (
              <span
                key={actualIndex}
                className={`mx-1 cursor-pointer rounded-full transition-all duration-500 ease-in-out ${
                  currentIndex === actualIndex
                    ? 'bg-primary h-4 w-4'
                    : 'bg-primary-200 hover:bg-primary h-2 w-2'
                }`}
                onClick={() => setCurrentIndex(actualIndex)}
              ></span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Slider;
