import { getDefaultMovies } from "@/lib/movies_page/movies_page";
import ContentCarousel from "../custom_ui/content_carousel/ContentCarousel";

const MoviesPageInfo = async () => {
  const movies = await getDefaultMovies();
  console.log(movies);
  return (
    <div className="flex flex-col items-center gap-15 mb-15">
      <div className="w-[95vw]">
        <h2 className="text-4xl font-semibold mb-3">Popular</h2>
        <ContentCarousel type="movie" content={movies.popular} />
      </div>
      <div className="w-[95vw]">
        <h2 className="text-4xl font-semibold mb-3">Top Rated</h2>
        <ContentCarousel type="movie" content={movies.top_rated} />
      </div>
      <div className="w-[95vw]">
        <h2 className="text-4xl font-semibold mb-3">Upcoming</h2>
        <ContentCarousel type="movie" content={movies.upcoming} />
      </div>
    </div>
  );
};

export default MoviesPageInfo;
