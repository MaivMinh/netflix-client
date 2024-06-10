import React, { useState, useEffect } from "react";
import instance from "../axios/themovieApi-axios-config";
import { UserAuth } from "../context/AuthContextProvider";
import { BiDetail } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { GiFilmSpool } from "react-icons/gi";
import { MdWatchLater } from "react-icons/md";
import Pie from "./Percentage";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import loginInstance from "../axios/logicAxios-config";
import firebaseDb from "../firebase/firebase.db";
import { Checkmark } from 'react-checkmark'

const FilmItem = (props) => {
  /* Components này giành cho thẻ phim ở các Categories phần sidebar, không phải bên phần Favourite. 
  Với mục đích là cho phần thẻ phim nó khác với bên favourite thôi.
  */
  const id = props.id; // Tìm thông tin chi tiết thông qua id.
  const [infor, setInfor] = useState(undefined);
  const [selected, setSelected] = useState(false);
  const [path, setPath] = useState(
    "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png"
  );
  const [like, setLike] = useState(false);

  const { user } = UserAuth();
  useEffect(() => {
    // Lấy dữ liệu phim.
    instance
      .get(`/movie/${id}`)
      .then((res) => {
        setInfor(res.data);
        if (res.data.poster_path != null) {
          setPath("https://image.tmdb.org/t/p/original" + res.data.poster_path);
        } else if (res.data.backdrop_path != null) {
          setPath(
            "https://image.tmdb.org/t/p/original" + res.data.backdrop_path
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleOptionClick(e) {
    setSelected(!selected);
  }
  function addToFavourite(e) {
    if (auth.currentUser) {
      // Nếu trạng thái hiện tại là true, thêm phim vào danh sách yêu thích.
      firebaseDb.updateSavedMovies(true, user, infor);
    } else if (user != undefined) {
      // Nếu người dùng đăng nhập bằng username và pass.
      // call api.

      loginInstance
        .post("/v1/insert-movie", {
          username: user.username,
          movie: {
            backdrop_path: infor.backdrop_path,
            id_film: infor.id,
            title: infor.title,
          },
        })
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    }
    setLike(true);
  }

  const rand = (n) => Math.random() * n;

  return (
    <div className="flex flex-row w-3/4 h-[300px] bg-[#222831] rounded-xl border-b-2 border-white">
      <div className="basis-1/4 bg-blue-400 h-full rounded-l-xl cursor-pointer relative">
        <Link className="h-full w-full" to={`/detail/${infor?.id}`}>
          <img className="object-cover h-full w-full rounded-l-xl" src={path} />
        </Link>
        {selected ? (
          <div className="absolute top-0 w-full h-[300px] bg-black opacity-30"></div>
        ) : null}
        <button
          className="font-bold text-2xl bg-slate-300 text-black px-3 pb-2.5 rounded-3xl absolute top-3 right-5 bg-opacity-75 hover:bg-opacity-100 hover:bg-red-500 hover:text-white group"
          onClick={handleOptionClick}
        >
          ...
        </button>
        <div
          className={
            selected
              ? "h-[65%] w-[65%] top-10 right-10 absolute flex flex-col justify-between rounded-xl bg-white"
              : "hidden"
          }
        >
          <Link
            className="flex flex-row items-center w-full bg-white text-black font-semibold justify-center text-center hover:cursor-pointer hover:bg-red-500 hover:text-white basis-1/4 rounded-t-xl hover:rounded-xl"
            to={`/detail/${infor?.id}`}
          >
            <BiDetail className="mr-2" />
            Detail
          </Link>
          <Link
            className="flex flex-row items-center w-full bg-white text-black font-semibold justify-center text-center hover:cursor-pointer hover:bg-red-500 hover:text-white basis-1/4 hover:rounded-xl"
            to={`/watch/${infor?.id}`}
          >
            <GiFilmSpool className="mr-2" />
            Watch
          </Link>
          <button
            className="flex flex-row items-center w-full bg-white text-black font-semibold justify-center text-center hover:cursor-pointer hover:bg-red-500 hover:text-white basis-1/4 hover:rounded-xl"
            onClick={addToFavourite}
          >
            {like ? (
              <Checkmark size='medium' />
            ): (
              <FaHeart className="mr-2" />
            )}
            Add to favourite
          </button>
          <Link
            className="flex flex-row items-center w-full bg-white text-black font-semibold justify-center text-center hover:cursor-pointer hover:bg-red-500 hover:text-white basis-1/4 rounded-b-xl hover:rounded-xl z-50"
            to={`/trailer/${infor?.id}`}
          >
            <MdWatchLater className="mr-2" />
            Trailer
          </Link>
        </div>
        <Pie
          percentage={
            infor?.vote_average.toFixed(1) != 0
              ? infor?.vote_average.toFixed(1)
              : 0
          }
          colour={`hsl(${rand(360)}, ${rand(50) + 50}%, ${rand(30) + 20}%)`}
        />
      </div>
      <div className="content basis-3/4  h-full rounded-r-xl py-4 pl-4 flex flex-col justify-between items-start gap-y-4 overflow-x-hidden overflow-y-scroll scrollbar-hide">
        <p className="text-3xl font-semibold">Title: {infor?.title}</p>
        <div>Overview: {infor?.overview}</div>
        <div className="flex flex-row gap-x-4">
          Genres:
          {infor?.genres.map((element) => {
            return (
              <Link
                className="text-red-500 italic"
                key={Math.random()}
                to={`/genres/${element.name}`}
              >
                {element.name}
              </Link>
            );
          })}
        </div>
        <p>Release Date: {infor?.release_date}</p>
        <p>Runtime: {infor?.runtime} mins</p>
        <p>Vote Count: {infor?.vote_count}</p>
      </div>
    </div>
  );
};

export default FilmItem;
