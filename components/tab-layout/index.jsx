'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import './index.scss';

const positionClasses = {
  'top-left': 'top-5 left-5',
  'top-right': 'top-5 right-5',
  'bottom-left': 'bottom-5 left-5',
  'bottom-right': 'bottom-5 right-5',
};

const TabLayout = ({
  tabs,
  className,
  fullScreenPosition = 'top-right',
  tabPosition = 'bottom-right',
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      ref.current.requestFullscreen();
      ref.current.setAttribute('data-fullscreen', 'true');
    } else {
      ref.current.setAttribute('data-fullscreen', 'false');
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={ref}
      data-fullscreen={false}
      className={`tab-layout relative flex flex-col items-center justify-center ${className}`}
    >
      {/* Render Active Component */}
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        {tabs[activeTab].component}
      </div>

      {/* Fullscreen Button */}
      <button
        onClick={toggleFullScreen}
        className={`group/full-screen absolute cursor-pointer items-center justify-center rounded-full bg-white p-2 lg:p-3 transition-all hover:bg-gray-200 ${positionClasses[fullScreenPosition]}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // width="24"
          // height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="small-screen-btn group-hover/full-screen:text-primary transition-transform hover:scale-110 size-5 lg:size-6"
        >
          <g id="main">
            <path d="M2 8.4v1.3h6.8c.5 0 .9-.4.9-.9V2H8.3v6.4zM22 8.4v1.3h-6.8c-.5 0-.9-.4-.9-.9V2h1.3v6.4zM15.6 22h-1.3v-6.8c0-.5.4-.9.9-.9H22v1.3h-6.4zM2 15.6v-1.3h6.8c.5 0 .9.4.9.9V22H8.3v-6.4z" />
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="full-screen-btn group-hover/full-screen:text-primary transition-transform hover:scale-110 size-5 lg:size-6"
        >
          <g id="main">
            <path d="M23.2 8.5h-1.4V2.2h-6.3V.9h6.9c.5 0 .8.3.8.8zM8.5 23.2H1.6c-.5 0-.8-.3-.8-.8v-6.9h1.4v6.3h6.3zM2.2 8.5H.9V1.6c0-.5.3-.8.8-.8h6.8v1.3H2.2zM22.4 23.2h-6.9v-1.3h6.3v-6.4h1.3v6.9c.1.5-.2.8-.7.8" />
          </g>
        </svg>
      </button>

      {/* Tab Buttons */}
      <div
        className={`group/tab-buttons bg-primary-50 absolute flex space-x-2 rounded-lg p-1 lg:p-2 shadow-md ${positionClasses[tabPosition]}`}
      >
        {tabs.map((tab, index) => {
          if (!tab.logo && !tab.url) {
            return null;
          }

          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`p-2 ${activeTab === index ? 'bg-gray-300' : 'bg-gray-100'} cursor-pointer rounded hover:bg-gray-200`}
            >
              {/* Render logo only if provided */}

              {tab.url && (
                <Image
                  src={tab.url}
                  alt={`Tab ${index}`}
                  width={20}
                  height={20}
                  className='lg:size-6'
                />
              )}
              {tab.logo && tab.logo}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabLayout;
