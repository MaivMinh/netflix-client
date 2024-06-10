import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjE1MjhmYTFmMzUyMjBmNTUwMGEwZTY2MjMzODA5NiIsInN1YiI6IjY1NzI5ZDY4OTY2NzBlMDEzNDA0ZTA1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZTmgn_TkBBaN0NyVYpFy-vUZxYy9dNa8upPHFN1rp9o'
  }
})

export default instance;