import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import CustomCard from '@/components/CustomCard';

type ChallengesCarouselProps = {
	challenges: {
	title: string;
	description: string;
  }[];
};


const ChallengesCarousel = ({ challenges }:ChallengesCarouselProps) => {
  return (
    <section className="bg-[#022340] rounded-lg shadow-lg p-6 my-8">
      <h3 className="text-3xl font-semibold text-white mb-6">
        Advent of Python Challenges
      </h3>
      <div className="relative">
        <Carousel opts={{ align: "start" }} className="w-full relative">
          <CarouselContent>
            {challenges.map((challenge, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <CustomCard
                    title={challenge.title}
                    description={challenge.description}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Simplified Carousel Controls */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <CarouselPrevious className="p-2 bg-white bg-opacity-60 text-gray-700 rounded-full hover:bg-opacity-80"/>
            <CarouselNext className="p-2 bg-white bg-opacity-60 text-gray-700 rounded-full hover:bg-opacity-80"/>
          </div>
        </Carousel>
      </div>
    </section>
  );
  
  
};

export default ChallengesCarousel;
