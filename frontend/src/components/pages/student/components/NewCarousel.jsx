import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import React from 'react'
import Autoplay from "embla-carousel-autoplay"

const NewCarousel = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent className="w-full">
          <CarouselItem className="w-full">
            <img
              src="/carousel1.webp"
              alt="Slide 1"
              className="w-full h-[400px] object-fill rounded-xl"
            />
          </CarouselItem>
          <CarouselItem className="w-full">
            <img
              src="/carousel2.jpg"
              alt="Slide 2"
              className="w-full h-[400px] object-fill rounded-xl"
            />
          </CarouselItem>
          <CarouselItem className="w-full">
            <img
              src="/carousel3.webp"
              alt="Slide 3"
              className="w-full h-[400px] object-fill rounded-xl"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default NewCarousel
