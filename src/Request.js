export const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjE1MjhmYTFmMzUyMjBmNTUwMGEwZTY2MjMzODA5NiIsInN1YiI6IjY1NzI5ZDY4OTY2NzBlMDEzNDA0ZTA1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZTmgn_TkBBaN0NyVYpFy-vUZxYy9dNa8upPHFN1rp9o";
export const apiKey = "bf1528fa1f35220f5500a0e662338096";

const requests = {
  NowPlaying: {
    url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`,
    config: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9. eyJhdWQiOiJiZjE1MjhmYTFmMzUyMjBmNTUwMGEwZTY2MjMzODA5NiIsInN1YiI6IjY1NzI5ZDY4OTY2NzBlMDEzNDA0ZTA1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZTmgn_TkBBaN0NyVYpFy-vUZxYy9dNa8upPHFN1rp9o",
    },
  },
  Popular: {
    url: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    config: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9. eyJhdWQiOiJiZjE1MjhmYTFmMzUyMjBmNTUwMGEwZTY2MjMzODA5NiIsInN1YiI6IjY1NzI5ZDY4OTY2NzBlMDEzNDA0ZTA1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZTmgn_TkBBaN0NyVYpFy-vUZxYy9dNa8upPHFN1rp9o",
    },
  },
  TopRated: {
    url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`,
    config: {
      accept: "application/json",
      Authorization: "Bearer bf1528fa1f35220f5500a0e662338096",
    },
  },
  Upcoming: {
    url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`,
    config: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjE1MjhmYTFmMzUyMjBmNTUwMGEwZTY2MjMzODA5NiIsInN1YiI6IjY1NzI5ZDY4OTY2NzBlMDEzNDA0ZTA1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZTmgn_TkBBaN0NyVYpFy-vUZxYy9dNa8upPHFN1rp9o",
    },
  },
  Trending: {
    url: `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US`,
    config: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjE1MjhmYTFmMzUyMjBmNTUwMGEwZTY2MjMzODA5NiIsInN1YiI6IjY1NzI5ZDY4OTY2NzBlMDEzNDA0ZTA1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZTmgn_TkBBaN0NyVYpFy-vUZxYy9dNa8upPHFN1rp9o",
    },
  },
};

export default requests;
