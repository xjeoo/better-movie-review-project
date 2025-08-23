import Pagination from "../pagination/Pagination";
import TvShowCard from "../custom_ui/content_carousel/TvShowCard";
import { TvShowSearch } from "@/lib/tv/tvshows";

const SearchResults = async ({
  search,
  page,
}: {
  search: string;
  page: string;
}) => {
  const data = await TvShowSearch(search, page);
  console.log(data);
  return (
    <div className="w-[95%] justify-center">
      <h2 className="text-2xl md:text-3xl mb-4">
        Search results for:
        <span className="font-semibold">&#34;{search}&#34;</span>
      </h2>

      <div className="flex gap-7 flex-wrap basis-full justify-center sm:justify-start ">
        {data.results.map((tvShow) => (
          //@ts-expect-error: works
          <TvShowCard key={tvShow.id} tvshow={tvShow} />
        ))}
      </div>
      <Pagination page={page} maxPage={data.total_pages} />
    </div>
  );
};

export default SearchResults;
