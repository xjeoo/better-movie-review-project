import { MovieSearch } from "@/lib/movies/movies";
import MovieCard from "../custom_ui/content_carousel/MovieCard";
import { DiscoverMovie } from "@/types/movies/movies";

const SearchResults = async ({
  search,
  page,
}: {
  search: string;
  page: string;
}) => {
  const data = await MovieSearch(search, page);
  console.log(data);
  return (
    <div className="w-[95%] justify-center">
      <h2 className="text-2xl md:text-3xl mb-4">
        Search results for:
        <span className="font-semibold">&#34;{search}&#34;</span>
      </h2>

      <div className="flex gap-7 flex-wrap basis-full justify-center sm:justify-start ">
        {data.results.map((movie) => (
          //@ts-expect-error
          <MovieCard key={movie.id} movie={movie as DiscoverMovie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
