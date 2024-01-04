'use client';
import React, { useRef, useState, useEffect } from 'react';
import CustomCard from '@/components/CustomCard';

type ChallengesCarouselProps = {
  challenges: {
    title: string;
    description: string;
  }[];
};

const ChallengesCarousel = ({ challenges }: ChallengesCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (index: number) => {
    if (carouselRef.current) {
      const scrollPosition = index * carouselRef.current.offsetWidth / 3; // Adjust for 3 items per view
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex < challenges.length - 3 ? currentIndex + 1 : 0); // Adjust for 3 items per view
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : challenges.length - 3); // Adjust for 3 items per view
  };

  useEffect(() => {
    scrollCarousel(currentIndex);
  }, [currentIndex]);

  return (
    <section className="bg-[#022340] rounded-lg shadow-lg p-6 my-8">
      <h3 className="text-3xl font-semibold text-white mb-6">Advent of Python Challenges</h3>
      <div className="relative">
        <div className="overflow-hidden" ref={carouselRef}>
          <div className="flex transition-all duration-300 ease-out">
            {challenges.map((challenge, index) => (
              <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                <CustomCard title={challenge.title} description={challenge.description} />
              </div>
            ))}
          </div>
        </div>
        <button onClick={handlePrevious} className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-white bg-opacity-60 text-gray-700 rounded-full hover:bg-opacity-80">
          {'<'}
        </button>
        <button onClick={handleNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-white bg-opacity-60 text-gray-700 rounded-full hover:bg-opacity-80">
          {'>'}
        </button>
      </div>
    </section>
  );
};

export default ChallengesCarousel;
