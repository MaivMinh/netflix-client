import React from "react";
import { Link } from "react-router-dom";

const MovieDetail = (props) => {
  const movie = props.movie;
  return (
    <div className="w-full h-[200px] flex flex-row gap-x-3 items-start">
      <Link to={`/detail/${movie.id}`} className="w-1/5 h-full">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        />
      </Link>
      <div className="flex flex-col w-4/5 h-full justify-between items-start">
        <Link to={`/detail/${movie.id}`}>{movie.original_title}</Link>
        <p>{movie.release_date}</p>
        <p>{movie.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
