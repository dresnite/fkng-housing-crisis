'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const getWindowDimensions = () => {
  const isClient = typeof window !== 'undefined';
  return {
    width: isClient ? window.innerWidth : 1024, // Default width
    height: isClient ? window.innerHeight : 768, // Default height
  };
};

export default function FloatingBike() {
  const [position, setPosition] = useState(() => ({ x: 0, y: 0 }));
  const [direction, setDirection] = useState(() => 1); // 1 for right, -1 for left
  const [dimensions, setDimensions] = useState(() => getWindowDimensions());
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    // Update dimensions on window resize
    const handleResize = () => {
      setDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define the boundaries to avoid the center area
  const centerWidth = 768; // max-w-3xl equivalent
  const centerPadding = 40;
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const avoidCenterX1 = centerX - (centerWidth / 2) - centerPadding;
  const avoidCenterX2 = centerX + (centerWidth / 2) + centerPadding;
  const avoidCenterY1 = centerY - 200;
  const avoidCenterY2 = centerY + 200;

  useEffect(() => {
    // Set initial position on the left or right edge
    setPosition({
      x: direction === 1 ? 0 : dimensions.width - 48,
      y: Math.random() * dimensions.height
    });

    const animate = () => {
      setPosition(current => {
        let newX = current.x + (direction * 2);
        let newY = current.y + Math.sin(newX * 0.02) * 1.5;

        // Check if we need to avoid the center area
        if (newX > avoidCenterX1 && newX < avoidCenterX2 && newY > avoidCenterY1 && newY < avoidCenterY2) {
          // Move above or below the center area
          newY = newY > centerY ? avoidCenterY2 : avoidCenterY1;
        }

        // Change direction when hitting screen edges
        if (newX > dimensions.width - 48) {
          setDirection(-1);
          newX = dimensions.width - 48;
        } else if (newX < 0) {
          setDirection(1);
          newX = 0;
        }

        // Keep Y within screen bounds
        if (newY > dimensions.height - 48) {
          newY = dimensions.height - 48;
        } else if (newY < 0) {
          newY = 0;
        }

        return { x: newX, y: newY };
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [direction, dimensions]);

  return (
    <div
      className="fixed pointer-events-none z-10"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scaleX(${direction})`,
        transition: 'transform 0.05s linear'
      }}
    >
      <Image
        src="/images/pokebike.gif"
        alt="Bike"
        width={48}
        height={48}
        className="opacity-75"
      />
    </div>
  );
} 