// import Autoplay from "embla-carousel-autoplay";
import { DiscoverMovie } from "@/types/movies/movies";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import MovieCard from "./MovieCard";
import TvShowCard from "./TvShowCard";
import { PopularTvShow } from "@/types/home_page/home_page_types";

const ContentCarousel = ({
  content,
  type,
}: {
  content: Array<DiscoverMovie> | Array<PopularTvShow>;
  type: "movie" | "tv";
}) => {
  return (
    <div className="relative">
      <div className="absolute -left-1 bg-gradient-to-r h-full w-[16px] from-black to-transparent z-10" />
      <div className="absolute -right-1 bg-gradient-to-l h-full w-[16px] from-black to-transparent z-10" />

      <Carousel
        orientation="horizontal"
        opts={{ dragFree: true }}
        // plugins={[
        //   Autoplay({
        //     delay: 5000,
        //   }),
        // ]}
      >
        <CarouselContent className="!p-0 bg-black ">
          {content.map((item: DiscoverMovie | PopularTvShow, index: number) => (
            <CarouselItem
              className="!justify-center !items-center basis-auto"
              key={index}
            >
              {type === "movie" ? (
                <MovieCard movie={item as DiscoverMovie} />
              ) : (
                <TvShowCard tvshow={item as PopularTvShow} />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="hidden lg:flex h-full w-15 absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-transparent text-white p-2 border-0 hover:!bg-dark-transparent hover:!text-white hover:opacity-50 cursor-pointer rounded-md" />
        <CarouselNext className="hidden lg:flex h-full w-15 !lg:absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-transparent text-white p-2 border-0 hover:!bg-dark-transparent hover:!text-white hover:opacity-50 cursor-pointer rounded-md" /> */}
      </Carousel>
    </div>
  );
};

export default ContentCarousel;
