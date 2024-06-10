import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieRow from "./MovieRow";
import { IoMdArrowDropright } from "react-icons/io";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { auth } from "../firebase/firebase.config";
import instance from "../axios/logicAxios-config";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { UserAuth } from "../context/AuthContextProvider";


const Row = (props) => {
  const request = props.request;
  const title = props.title;
  const { user, setUser } = UserAuth();
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  useEffect(() => {
    // Lấy danh sách film yêu thích của user rồi nạp vào cho MovieRow component.

    async function updateSavedMovies() {
      if (auth.currentUser != null) {
        // fetch favourite movie.
        const unsubcribe = onSnapshot(doc(db, "users", `${user}`), (doc) => {
          setSavedMovies(doc.data()?.savedMovies);
        });
        return () => {
          unsubcribe();
        };
      } else if (user != undefined) {
        await instance
          .post("/v1/get-movie", { username: user.username })
          .then((res) => {
            setSavedMovies(res.data);
          })
          .catch((error) => console.log(error));
      }
    }
    updateSavedMovies();

    async function fetchData() {
      try {
        const result = await axios.get(request.url, request.config);
        setMovies(result.data.results);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  function moveSlideToLeft() {
    const id = props.rowID;
    let slider = document.getElementById(`slider_${id}`);
    slider.scrollLeft = slider.scrollLeft - 500;
  }

  function moveSlideToRight() {
    const id = props.rowID;
    let slider = document.getElementById(`slider_${id}`);
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  return (
    <div className="mx-auto w-[90%] h-[300px] flex flex-col gap-y-4 justify-around items-start relative group/item my-4 ">
      <MdChevronLeft
        onClick={moveSlideToLeft}
        className="cursor-pointer hidden group-hover/item:block z-30 absolute top-2/4 text-5xl left-0 rounded-3xl bg-white opacity-50 hover:opacity-100  text-black"
      />
      <h1 className="text-2xl mt-4 row-title py-2 px-3 relative cursor-pointer">
        {title} <IoMdArrowDropright className="inline" />
      </h1>
      <div
        id={`slider_${props.rowID}`}
        className="w-full h-full scrollbar-hide overflow-y-hidden whitespace-nowrap scroll-smooth"
      >
        {movies.length !== 0 &&
          movies.map((movie) => {
            return <MovieRow key={movie.id || movie.id_film} movie={movie} savedMovies={savedMovies} />;
          })}
      </div>
      <MdChevronRight
        onClick={moveSlideToRight}
        className="cursor-pointer hidden group-hover/item:block z-30 absolute top-2/4 text-5xl right-0 rounded-3xl bg-white opacity-50 hover:opacity-100 text-black"
      />
    </div>
  );
};

export default Row;
