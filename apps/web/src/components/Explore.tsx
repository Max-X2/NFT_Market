import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Card from './Card'

const Explore = () => {
  return (
    <div className="w-[800px] border-2 border-solid border-white ">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <Card />
          </CarouselItem>
          <CarouselItem>
            <Card />
          </CarouselItem>
          <CarouselItem>
            <Card />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default Explore
