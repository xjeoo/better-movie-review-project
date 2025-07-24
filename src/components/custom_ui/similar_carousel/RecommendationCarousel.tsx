import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import RecommendationCard from "./RecommendationCard";

const RecommendationsCarousel = ({
  info,
  type = "movie",
}: {
  info: any;
  type?: string;
}) => {
  // sa pun props pentru type: movie sau tv-show
  return (
    <div className="relative">
      <div className="absolute -left-1 w-[5%] h-full bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute -right-1 w-[5%] h-full bg-gradient-to-l from-black to-transparent z-10" />

      <Carousel opts={{ dragFree: true }}>
        <CarouselContent className="px-1">
          {info.map((item: any, index: number) => (
            <CarouselItem
              className="!justify-center !items-center basis-auto "
              key={index}
            >
              <RecommendationCard info={item} type={type} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex bg-black cursor-pointer" />
        <CarouselNext className="hidden md:flex bg-black cursor-pointer" />
      </Carousel>
    </div>
  );
};

export default RecommendationsCarousel;
