import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../Request";
import Carousel from "./Carousel";

const Main = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        requests.Popular.url,
        requests.Popular.config
      );
      setMovies(result.data.results);
    }
    fetchData();
  }, []);
  return (
    <div className="main w-full h-[550px]">
      {movies.length != 0 && <Carousel data={movies} />}
    </div>
  );
};

export default Main;
