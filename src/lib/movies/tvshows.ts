

const TMDB_READ_ACCESS_KEY = process.env.TMDB_READ_ACCESS_KEY

export async function getTvShowById(showId: string){
  const url = `https://api.themoviedb.org/3/tv/${showId}`;
  const options = { 
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_READ_ACCESS_KEY}`
  }}
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (err) {
    
  }
}
