'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-6 text-white">
      <div className="relative mb-6 h-48 w-48">
        <Image
          alt="Tank"
          src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Tank_SVG_drawing.svg"
          className="animate-pulse drop-shadow-lg"
          fill
        />
      </div>
      <h1 className="mb-4 text-center text-3xl font-bold drop-shadow-xl md:text-5xl">
        Oops! Something went wrong.
      </h1>
      <p className="mb-6 text-center text-lg text-gray-400">
        The page you’re looking for doesn’t exist or an error occurred.
      </p>
      <Link
        href="/"
        className="bg-primary hover:bg-primary-600 flex items-center space-x-2 rounded px-4 py-2 text-gray-100 transition duration-150"
        title="Return Home"
      >
        <HomeIcon />
        <span>Return Home</span>
      </Link>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}
