

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
  return movies.json();
  
} catch (error) {
  console.log('Error fetching discover movies', error);
}

}