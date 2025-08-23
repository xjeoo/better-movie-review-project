import SearchBar from "@/components/shows_page/SearchBar";
import SearchResults from "@/components/shows_page/SearchResults";
import TvShowsPageInfo from "@/components/shows_page/TvShowsPageInfo";

const TvShowsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) => {
  const params = await searchParams;
  const search = params.search;
  const page = params.page || "1";

  return (
    <div className="flex flex-col bg-black items-center">
      <SearchBar />
      {!search ? (
        <TvShowsPageInfo />
      ) : (
        <SearchResults search={search} page={page} />
      )}
    </div>
  );
};

export default TvShowsPage;
