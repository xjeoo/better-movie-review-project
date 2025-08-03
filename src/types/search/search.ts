export interface SearchResult {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;          // for movies
  name?: string;           // for tv shows and people
  overview?: string;
  poster_path: string | null;
  profile_path?: string | null;  // for people
  release_date?: string;    // for movies
  first_air_date?: string;  // for tv shows
  known_for_department?: string;  // for people
}