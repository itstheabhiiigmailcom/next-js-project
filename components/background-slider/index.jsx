'use client';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/utils/cn';
import Image from 'next/image';

const SlidingBackground = ({
  className = 'w-full',
  backgroundImages = [
    '/background-slider/S3_1.webp',
    '/background-slider/S3_2.webp',
    '/background-slider/S3_3.webp',
  ],
  overlayImages = [
    '/background-slider/S5_1.webp',
    '/background-slider/S3_6.webp',
    '/background-slider/S3_7.webp',
  ],
  robotImage = '/background-slider/alfred.png',
  extraScrollSpace = 50,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const imagesCount = backgroundImages.length;
  const overlayImagesCount = overlayImages.length;

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollTop = window.scrollY - container.offsetTop;
      const scrollHeight = container.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);

      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateImageProgress = (index, totalImages) => {
    const sectionSize = 1 / totalImages;
    const start = index * sectionSize;
    const end = (index + 1) * sectionSize;
    const buffer = 0.1 * sectionSize;
    const adjustedStart = Math.max(0, start - buffer);
    const adjustedEnd = Math.min(1, end - buffer);

    let progress =
      (scrollProgress - adjustedStart) / (adjustedEnd - adjustedStart);
    progress = Math.max(0, Math.min(progress, 1));

    return easeOutCubic(progress);
  };

  const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      style={{ height: `${imagesCount * (100 + extraScrollSpace)}vh` }}
    >
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
        {backgroundImages.map((src, index) => {
          const imageProgress = calculateImageProgress(index, imagesCount);
          const isLastImage = index === imagesCount - 1;
          const translateY = isLastImage ? 0 : -imageProgress * 100;

          return (
            <div
              key={index}
              className="absolute top-0 left-0 h-screen w-full"
              style={{ zIndex: -index }}
            >
              <div
                className="h-full w-full transition-transform duration-[1.5s] ease-out"
                style={{ transform: `translateY(${translateY}%)` }}
              >
                <Image
                  src={src}
                  alt={`Background ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  quality={100}
                  priority={index === 0}
                />
              </div>
            </div>
          );
        })}

        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2 transform text-center text-4xl font-bold text-black">
          Our Heading Text Here
        </div>

        <div className="absolute top-[43%] left-[20%] flex h-auto md:top-[43%] md:left-[26%] lg:top-[43%] lg:left-[35%]">
          <div className="relative h-100 w-100">
            {robotImage && (
              <Image
                src={robotImage}
                alt="Robot"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            )}

            <div className="absolute top-[20%] left-[37.5%] h-[149px] w-[100px] overflow-hidden">
              {overlayImages.map((src, index) => {
                const imageProgress = calculateImageProgress(
                  index,
                  overlayImagesCount,
                );
                const isLastOverlay = index === overlayImagesCount - 1;
                const translateY = isLastOverlay ? 0 : -imageProgress * 100;

                return (
                  <div
                    key={index}
                    className="absolute top-0 left-0 h-full w-full"
                    style={{ zIndex: overlayImagesCount - index }}
                  >
                    <div
                      className="h-full w-full transition-transform duration-[1.5s] ease-out"
                      style={{ transform: `translateY(${translateY}%)` }}
                    >
                      <Image
                        src={src}
                        alt={`Overlay ${index + 1}`}
                        fill
                        style={{ objectFit: 'contain' }}
                        quality={100}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidingBackground;
