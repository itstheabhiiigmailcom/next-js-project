'use client';

import { useState, useRef } from 'react';

export default function RobotRestaurantMatcher() {
  // Restaurant backgrounds
  const restaurantBackgrounds = [
    '/background-slider/S3_1.webp?height=400&width=300',
    '/background-slider/S3_2.webp?height=400&width=300',
    '/background-slider/S3_3.webp?height=400&width=300',
    '/background-slider/S3_1.webp?height=400&width=300',
  ];

  // Robot images
  const robotImages = [
    '/background-slider/alfred.png?height=200&width=150',
    '/vertical-horizontal-scroll/alfred-1.png?height=200&width=150',
    '/vertical-horizontal-scroll/alfred-3.png?height=200&width=150',
    '/vertical-horizontal-scroll/alfred-4.png?height=200&width=150',
  ];

  // State to track robot positions
  const [robotPositions, setRobotPositions] = useState(() => {
    return robotImages.map((image, index) => ({
      id: `robot-${index + 1}`,
      cardIndex: index,
      image: image,
    }));
  });

  const draggedRobotRef = useRef(null);

  // Handle drag start
  const handleDragStart = (e, robotId) => {
    draggedRobotRef.current = robotId;
    e.dataTransfer?.setData('text/plain', robotId);
    e.dataTransfer.effectAllowed = 'move';

    // Add visual feedback
    e.currentTarget.classList.add('scale-90', 'opacity-80');
  };

  // Handle drag end
  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('scale-90', 'opacity-80');
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    // Add hover effect to drop target
    e.currentTarget.classList.add('ring-2', 'ring-blue-500');
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('ring-2', 'ring-blue-500');
  };

  // Handle drop
  const handleDrop = (e, targetCardIndex) => {
    e.preventDefault();
    e.currentTarget.classList.remove('ring-2', 'ring-blue-500');

    const robotId = draggedRobotRef.current;
    if (!robotId) return;

    setRobotPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      const draggedRobotIndex = newPositions.findIndex((r) => r.id === robotId);

      if (draggedRobotIndex === -1) return prevPositions;

      // Find robot currently on target card (if any)
      const targetRobotIndex = newPositions.findIndex(
        (r) => r.cardIndex === targetCardIndex,
      );

      if (targetRobotIndex !== -1) {
        // Swap positions
        newPositions[targetRobotIndex].cardIndex =
          newPositions[draggedRobotIndex].cardIndex;
      }

      // Move dragged robot to target card
      newPositions[draggedRobotIndex].cardIndex = targetCardIndex;

      return newPositions;
    });

    draggedRobotRef.current = null;
  };

  // Card component
  function Card({ className, children }) {
    return (
      <div
        className={`relative h-full w-full overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl ${className || ''}`}
      >
        {children}
      </div>
    );
  }

  // CardContent component
  function CardContent({ className, children }) {
    return <div className={`h-full w-full ${className || ''}`}>{children}</div>;
  }

  // Robot component
  function Robot({ id, image, onDragStart, onDragEnd }) {
    return (
      <div
        draggable
        onDragStart={(e) => onDragStart(e, id)}
        onDragEnd={handleDragEnd}
        className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform cursor-grab transition-transform duration-200 active:scale-110 active:cursor-grabbing"
      >
        <img
          src={image || '/placeholder.svg'}
          alt={`Robot ${id}`}
          className="h-40 w-40 object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)] transition-all duration-300 hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
        />
      </div>
    );
  }

  // RestaurantCard component
  function RestaurantCard({ index, background, children }) {
    return (
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, index)}
        className="relative h-80 w-full transition-all duration-300 hover:z-10 hover:scale-105 sm:h-96 lg:h-[28rem]"
      >
        <Card>
          <CardContent>
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${background})`,
                filter: 'brightness(0.9) contrast(1.1)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              {children}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-12 text-center text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          Robot Restaurant Matcher
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {restaurantBackgrounds.map((background, index) => (
            <RestaurantCard
              key={`restaurant-${index}`}
              index={index}
              background={background}
            >
              {robotPositions.map((robot) =>
                robot.cardIndex === index ? (
                  <Robot
                    key={robot.id}
                    id={robot.id}
                    image={robot.image}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ) : null,
              )}
            </RestaurantCard>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-300">
          <p>Drag and drop robots to match them with restaurants</p>
        </div>
      </div>
    </div>
  );
}
