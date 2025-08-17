import MoviesPageInfo from "@/components/movies_page/MoviesPageInfo";
import SearchBar from "@/components/movies_page/SearchBar";
import SearchResults from "@/components/movies_page/SearchResults";

const MoviesPage = async ({
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
        <MoviesPageInfo />
      ) : (
        <SearchResults search={search} page={page} />
      )}
    </div>
  );
};

export default MoviesPage;
