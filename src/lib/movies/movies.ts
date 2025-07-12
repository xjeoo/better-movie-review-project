

const TMDB_READ_ACCESS_KEY = process.env.TMDB_READ_ACCESS_KEY

export async function getDiscoverMovies(){
  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
  const options = { 
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_READ_ACCESS_KEY}`
  }
};

try {
  const movies = await fetch(url, options);
  const finalMovies = (await movies.json()).results.slice(0,10); // daca le vreau pe toate 20 returnez doar movies.json()
  return finalMovies;                                            // si dupa sa modific sa fie si .results in
  
} catch (error) {
  console.log('Error fetching discover movies', error);
}

}

export async function getMovieById(movieId: string)
{
  const videourl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
  const infourl = `https://api.themoviedb.org/3/movie/${movieId}`;

  const options = { 
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_READ_ACCESS_KEY}`
  }
};

  const [detailsRes, videosRes] = await Promise.all([
    fetch(infourl, options),
    fetch(videourl, options)
  ]);
  if(!detailsRes.ok) console.log("Failed fetching movie details");
  if(!videosRes.ok) console.log("Failed fetching movie videos");

  const movieInfo = {
    data: await detailsRes.json(),
    video: await videosRes.json()
  }

  return movieInfo;
}