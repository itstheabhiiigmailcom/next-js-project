'use client';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import './index.scss';

function Showcase({
  className,
  imageURL = '',
  imageAlt = 'showcase',
  points = [],
  threshold = 0.7,
}) {
  const showcaseRef = useRef(null);

  useEffect(() => {
    if (!showcaseRef.current) return;

    const elements = showcaseRef.current.querySelectorAll('#showcase-wrapper');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            entry.target.classList.remove('exit-animate');
          } else {
            entry.target.classList.add('exit-animate');
            entry.target.classList.remove('animate');
          }
        });
      },
      { threshold },
    );

    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, [threshold]);

  if (!imageURL) return null;

  return (
    <section
      id="showcase"
      className={cn('relative', className)}
      ref={showcaseRef}
    >
      <Image src={imageURL} alt={imageAlt} fill />;
      <span className="sr-only">{imageAlt}</span>
      {points?.map(({ className: cls, direction, text, lineHeight }, index) => (
        <div
          id="showcase-wrapper"
          className={cn('absolute z-10', cls)}
          data-direction={direction}
          key={index}
        >
          <div
            className="showcase-content-wrapper h-full w-full"
            style={{
              ['--line-height']: `${lineHeight}px`,
            }}
          >
            <p className="showcase-content">{text || ''}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Showcase;
