export const backDropPathOriginal = "https://image.tmdb.org/t/p/original";
export const backDropPath300 = "https://image.tmdb.org/t/p/w300";
export const backDropPath780 = "https://image.tmdb.org/t/p/w780";
export const backDropPath1280 = "https://image.tmdb.org/t/p/w1280";
export const backDropPath1920 = "https://image.tmdb.org/t/p/w1920"; // unofficial




export const posterPathOriginal = "https://image.tmdb.org/t/p/original/";
export const posterPath500 = "https://image.tmdb.org/t/p/w500/";
export const posterPath342 = "https://image.tmdb.org/t/p/w342/";
export const posterPath154 = "https://image.tmdb.org/t/p/w154/";

export const profilePath185 = "https://image.tmdb.org/t/p/w185/";

export const starColor = "#5f9beb";

export const months = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

export const TMDB_READ_ACCESS_KEY = process.env.TMDB_READ_ACCESS_KEY;

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_READ_ACCESS_KEY}`,
  },
};
