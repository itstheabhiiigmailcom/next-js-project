'use client';
import { cn } from '@/utils/cn';
import { useEffect, useState, useRef } from 'react';
import LineWithDot from './components/paths/line-with-dots';
import CurveLineWithDot from './components/paths/curve-line';
import MailIcon from './components/icons/mail-icon';
import UserIcon from './components/icons/user-icon';
import HomeIcon from './components/icons/home-icon';
import PlusIcon from './components/icons/plus-icon';
import CheckIcon from './components/icons/check-icon';
import RightCurveLineWithDot from './components/paths/right-curve-line';
import ProgressTracker from './progress-tracker';

import './index.scss';

export default function ComplianceDashboard({
  title = 'State compliance',
  highlightedTitle = 'easy way.',
  highlightColor = 'text-emerald-600',
  homeIconProps = {
    width: 100,
    height: 100,
    strokeColor: '#22c55e',
    fillColor: '#14532d',
  },
  animationDuration = 17000,
  lineColor = '#22c55e',
  lineWidth = 6,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);
  const [showProgressTracker, setShowProgressTracker] = useState(false);
  const animationTimerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          setIsVisible(true);

          // Clear any existing timer
          if (animationTimerRef.current) {
            clearTimeout(animationTimerRef.current);
          }

          // Set timer to show ProgressTracker after all animations complete
          // The last animation (moveLeft) starts at 13.8s and takes 3s, so we'll use 17s total
          animationTimerRef.current = setTimeout(() => {
            setShowProgressTracker(true);
          }, animationDuration);
        } else {
          setIsVisible(false);

          // Clear the timer if component is no longer visible
          if (animationTimerRef.current) {
            clearTimeout(animationTimerRef.current);
            animationTimerRef.current = null;
          }

          // Reset the progress tracker state when component is not visible
          setShowProgressTracker(false);
        }
      },
      { threshold: 0.5 },
    );
    const currentElement = componentRef.current;
    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      // Clean up timer on unmount
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, []);

  return (
    <svg
      className="compliance-dashboard-svg mx-auto h-auto max-h-screen w-auto max-w-screen"
      viewBox="0 0 1500 800"
      preserveAspectRatio="xMidYMid meet"
    >
      <foreignObject width="100%" height="100%">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{ width: '100%', height: '100%' }}
        >
          <div
            ref={componentRef}
            className={`compliance-dashboard relative w-full overflow-hidden bg-white p-8 transition-opacity duration-700`}
          >
            <div className="mb-16 max-w-md">
              <h1 className="text-4xl font-bold text-slate-800">
                {title} <br />
                the <span className="text-emerald-600">{highlightedTitle}</span>
              </h1>

              <div className="absolute top-8 right-8 max-w-xs border-l-2 border-slate-300 pl-4">
                <p className="text-sm text-slate-700">
                  Mosey has everything you need to get compliant in{' '}
                  <span className={cn('font-medium', highlightColor)}>
                    all 50 states
                  </span>{' '}
                  in one, easy-to-use platform.
                </p>
              </div>
            </div>
            {showProgressTracker ? (
              <div className="report-slide-in flex h-full w-full items-center justify-center transition-opacity duration-500">
                <ProgressTracker />
              </div>
            ) : (
              <>
                {/* Main content */}
                <div className="relative flex items-center justify-center">
                  <div className="mb-16 grid grid-cols-3 gap-[20px]">
                    {/* Left side items */}
                    <div className="space-y-20">
                      {/* Item-1 */}
                      <div
                        className={`${isVisible ? 'animate-item-1' : ''} flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md transition-transform duration-700 ${
                          isVisible
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-10 opacity-0'
                        }`}
                      >
                        <div
                          className={`${isVisible ? 'animate-icon' : ''} rounded-full bg-slate-100 p-1`}
                        >
                          <MailIcon />
                        </div>
                        <span className="text-sm font-medium">
                          Withholding tax account
                        </span>
                      </div>

                      {/* Animated dotted line */}
                      {isVisible && (
                        <LineWithDot
                          mounted={isVisible}
                          top={25}
                          left={44}
                          width={220}
                          height={120}
                          transform="rotate(36deg)"
                          className="dotted-centered-line-1"
                        />
                      )}

                      {/* Item-2 */}
                      <div
                        className={`${isVisible ? 'animate-item-2' : ''} flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md transition-transform duration-700 ${
                          isVisible
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-10 opacity-0'
                        }`}
                      >
                        <div className="animate-icon rounded-full bg-slate-100 p-1">
                          <PlusIcon />
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Unemployment</span>
                          <br />
                          <span className="text-xs">Insurance account</span>
                        </div>
                      </div>

                      {/* Animated dotted line */}
                      {isVisible && (
                        <LineWithDot
                          mounted={isVisible}
                          top={52}
                          left={41.5}
                          width={220}
                          height={120}
                          transform="rotate(26deg)"
                          className="dotted-centered-line-2"
                        />
                      )}

                      {/*Left Curve animated line */}
                      {isVisible && (
                        <CurveLineWithDot className="-top-[81px] -left-[253px]" />
                      )}
                    </div>

                    {/* Center - City illustration */}
                    <div
                      className={`${isVisible ? 'home-icon-move-left' : ''} relative mt-[121px] flex items-center justify-center`}
                    >
                      {/* Horizontal line animation */}
                      <svg
                        width="200"
                        height="6"
                        className={`${isVisible ? 'home-icon-bottom-line' : ''} absolute -bottom-[22px] opacity-0 transition-opacity duration-700`}
                      >
                        <line
                          x1="0"
                          y1="3"
                          x2="200"
                          y2="3"
                          stroke={lineColor}
                          strokeWidth={lineWidth}
                          strokeLinecap="round"
                        />
                      </svg>

                      {/* Home Icon animation */}
                      <div
                        className={`flex h-48 w-48 items-center justify-center rounded-full bg-slate-100 transition-transform duration-700 ${
                          isVisible ? 'home-icon-fade-in' : 'opacity-0'
                        }`}
                      >
                        {/* Move only the icon, not the entire container */}
                        <HomeIcon
                          width={homeIconProps.width}
                          height={homeIconProps.height}
                          strokeColor={homeIconProps.strokeColor}
                          fillColor={homeIconProps.fillColor}
                        />
                      </div>
                    </div>

                    {/* Right side items */}
                    <div className="space-y-20">
                      {/* 3rd Item - New Hire */}
                      <div
                        className={` ${isVisible ? 'animate-right-item-3' : ''} flex w-fit items-center gap-3 rounded-full bg-slate-800 px-4 py-2 shadow-md transition-transform duration-700 ${
                          isVisible
                            ? 'translate-x-0 opacity-100'
                            : 'translate-x-10 opacity-0'
                        }`}
                      >
                        <div
                          className={`${isVisible ? 'animate-icon' : ''} h-10 w-10 overflow-hidden rounded-full bg-slate-700`}
                        >
                          <UserIcon
                            width={40}
                            height={40}
                            bgColor="#475569"
                            fillColor="#fff"
                            strokeColor="#fff"
                          />
                        </div>
                        <div className="text-white">
                          <div className="text-xs">New hire in New York</div>
                          <div className="font-medium">Leon Bennett</div>
                        </div>
                      </div>

                      {/* Animated dotted line */}
                      {isVisible && (
                        <LineWithDot
                          mounted={isVisible}
                          top={30}
                          left={56}
                          width={220}
                          height={120}
                          transform="rotate(142deg)"
                          className="dotted-centered-line-3"
                        />
                      )}

                      {/* 4th Item - Employee Move */}
                      <div
                        className={`${isVisible ? 'animate-right-item-4' : ''} ml-[61px] flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md transition-transform duration-700 ${
                          isVisible
                            ? 'translate-x-0 opacity-100'
                            : 'translate-x-10 opacity-0'
                        }`}
                      >
                        <div
                          className={`${isVisible ? 'animate-icon' : ''} animate-icon rounded-full bg-slate-100 p-1`}
                        >
                          <CheckIcon />
                        </div>
                        <span className="text-sm font-medium">
                          Employee move
                        </span>
                      </div>

                      {/* Animated dotted line */}
                      {isVisible && (
                        <LineWithDot
                          mounted={isVisible}
                          top={54}
                          left={59}
                          width={220}
                          height={120}
                          transform="rotate(-202deg)"
                          className="dotted-centered-line-4"
                        />
                      )}
                      {isVisible && (
                        <RightCurveLineWithDot className="top-[150px] -right-[85px]" />
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </foreignObject>
    </svg>
  );
}
