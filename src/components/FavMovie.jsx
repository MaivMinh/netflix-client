import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContextProvider";
import firebaseDb from "../firebase/firebase.db";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import instance from "../axios/logicAxios-config";

const FavMovie = (props) => {
  const movie = props.movie;
  const { user } = UserAuth();

  function handleClick(e) {
    if (auth.currentUser) {
      props.onClick(movie.id);
      firebaseDb.updateSavedMovies(false, user, movie);
    } else if (user != undefined) {
      props.onClick(movie.id_film);
      // call delete api.
      instance
        .post("/v1/delete-movie", {
          username: user.username,
          movie: {
            backdrop_path: movie.backdrop_path,
            id_film: movie.id_film,
            title: movie.title,
          },
        })
        .then((res) => {})
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="h-full sm:w-[450px] md:w-[260px] lg:w-[300px] inline-block mr-8 cursor-pointer group relative">
      {auth.currentUser ? (
        <Link
          className="absolute top-0 left-0 border-[1px] border-white p-1 rounded-lg group-hover:block hidden hover:text-black hover:bg-white duration-300"
          to={`/detail/${movie?.id}`}
        >
          Chi tiết
        </Link>
      ) : (
        <Link
          className="absolute top-0 left-0 border-[1px] border-white p-1 rounded-lg group-hover:block hidden hover:text-black hover:bg-white duration-300"
          to={`/detail/${movie?.id_film}`}
        >
          Chi tiết
        </Link>
      )}
      <img
        className="w-full object-cover rounded-xl group-hover:shadow-lg group-hover:shadow-cyan-300/50"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
      />
      <button
        onClick={handleClick}
        className="absolute top-2 right-2 hidden group-hover:block p-2 rounded-3x"
        value={movie.email}
      >
        <IoMdCloseCircle className="opacity-50 hover:opacity-100" size={30} />
      </button>
      <p className="hidden group-hover:flex w-full absolute bottom-0 bg-black py-3 px-2 opacity-70 rounded-b-2xl">
        {movie.title}
      </p>
    </div>
  );
};

export default FavMovie;
