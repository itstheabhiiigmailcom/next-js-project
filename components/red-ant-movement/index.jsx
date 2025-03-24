'use client';
import { useRef, useEffect, useState } from 'react';
import AntSVG from './sub-components/ant-svg';
import './index.scss';

const RedAntScrolling = ({ className, children }) => {
  const parentRef = useRef(null);
  const antRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollingTimerRef = useRef(null);

  console.log('isScrolling : ', isScrolling);
  useEffect(() => {
    const handleScroll = () => {
      if (!parentRef.current || !antRef.current) return;

      const scrollY = window.scrollY;
      const parentRect = parentRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if the component is fully visible in the viewport
      const isComponentAtTop =
        parentRect.top <= 0 && parentRect.bottom >= viewportHeight;

      if (isComponentAtTop) {
        const parentHeight = parentRef.current.offsetHeight;

        // Calculate the ant's position relative to the scroll progress
        console.log('scrollY - parentRect.top : ', scrollY - parentRect.top);
        console.log(
          '(scrollY - parentRect.top)/parentHeight : ',
          (scrollY - parentRect.top) / parentHeight,
        );
        const antPosition =
          ((scrollY - parentRect.top) / parentHeight) * 200 - 170;
        console.log('ant-position : ', antPosition);

        // Apply the transformation gradually
        antRef.current.style.transform = `translateY(${antPosition}px)`;

        // Set scrolling state to true
        setIsScrolling(true);

        // Clear any existing timer
        if (scrollingTimerRef.current) {
          clearTimeout(scrollingTimerRef.current);
        }

        // Set a timer to detect when scrolling stops
        scrollingTimerRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150); // Adjust timeout as needed
      } else {
        // Reset the ant's position if the component is not fully visible
        antRef.current.style.transform = 'translateY(0)';
        setIsScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollingTimerRef.current) {
        clearTimeout(scrollingTimerRef.current);
      }
    };
  }, [isScrolling]);

  return (
    <div
      ref={parentRef}
      className={`red-ant-movement ant-container relative h-[500vh] ${className}`}
    >
      {/* Ant SVG */}
      <AntSVG
        ref={antRef}
        className={`sticky top-[0%] left-1/2 z-10 h-80 w-80 -translate-x-1/2 transform transition-transform duration-500 ease-in-out ${
          isScrolling ? 'is-scrolling opacity-100' : 'opacity-20'
        }`}
      />

      {/* Content Section */}
      <div className="content absolute inset-0 z-0 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default RedAntScrolling;
