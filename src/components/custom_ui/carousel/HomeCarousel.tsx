// import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import CarouselCard from "./CarouselCard";

const HomeCarousel = ({ movies }: { movies: any }) => {
  return (
    <Carousel
      orientation="horizontal"
      // plugins={[
      //   Autoplay({
      //     delay: 5000,
      //   }),
      // ]}
    >
      <CarouselContent className="!p-0 bg-black ">
        {movies.map((movie: any, index: number) => (
          <CarouselItem className="!justify-center !items-center  " key={index}>
            <CarouselCard
              movie={movie}
              index={index}
              maxLength={movies.length}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:flex h-full w-15 absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-transparent text-white p-2 border-0 hover:!bg-dark-transparent hover:!text-white hover:opacity-50 cursor-pointer rounded-md" />
      <CarouselNext className="hidden lg:flex h-full w-15 !lg:absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-transparent text-white p-2 border-0 hover:!bg-dark-transparent hover:!text-white hover:opacity-50 cursor-pointer rounded-md" />
    </Carousel>
  );
};

export default HomeCarousel;
