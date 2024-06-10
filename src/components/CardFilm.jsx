import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CardFilm = ({ movie }) => {
  return (
    <div className="w-full flex flex-row gap-x-2 border-2 rounded-lg">
      <img
        className="basis-1/3 w-1/3 h-[100px] object-contain hover:object-cover hover:cursor-pointer"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
      />
      <div className="basis-2/3 flex flex-col items-start justify-start gap-y-1">
        <a
          className="text-xl font-bold hover:text-red-500"
          href={`/detail/${movie.id}`}
        >
          {movie.title}
        </a>
        <p className="text-lg font-semibold">{movie.release_date}</p>
        <p className="text-md font-medium">Rating {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default CardFilm;
