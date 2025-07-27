export type videoResult = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number | string;
  type: string;
  official: true;
  published_at: string | Date;
};

export type tvShowSeason ={
  air_date: string,
  episode_count: number,
  id: number | string,
  name: string,
  overview: string,
  poster_path: string,
  season_number: string,
  vote_average: number,
  
}