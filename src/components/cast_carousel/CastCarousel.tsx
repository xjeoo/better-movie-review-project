import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import CastCard from "./CastCard";

const CastCarousel = ({ info }: { info: any }) => {
  return (
    <div className="relative">
      <div className="absolute -left-1 w-[20%] h-full bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute -right-1 w-[20%] h-full bg-gradient-to-l from-black to-transparent z-10"></div>

      <Carousel>
        <CarouselContent>
          {info.map((dude: any, index: number) => (
            <CarouselItem
              className="!justify-center !items-center basis-1/1 sm:basis-1/2 lg:basis-[29%] xl:basis-1/4  "
              key={index}
            >
              <CastCard info={dude} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex bg-black cursor-pointer" />
        <CarouselNext className="hidden md:flex bg-black cursor-pointer" />
      </Carousel>
    </div>
  );
};

export default CastCarousel;
