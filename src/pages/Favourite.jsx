import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContextProvider";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";
import FavMovie from "../components/FavMovie";
import { useNavigate } from "react-router-dom";
import instance from "../axios/logicAxios-config";

const Favourite = () => {
  const { user, setUser } = UserAuth();
  const [savedMovies, setSavedMovies] = useState([]);
  const navigate = useNavigate();

  function remove(id) {
    if (auth.currentUser) {
      setSavedMovies((previousSavedMovies) => {
        return previousSavedMovies.filter((value, index) => {
          return value.id !== id;
        });
      });
    } else if (user != undefined) {
      setSavedMovies((previousSavedMovies) => {
        return previousSavedMovies.filter((value, index) => {
          return value.id_film != id;
        });
      });
    }
  }

  useEffect(() => {
    if (user == undefined) navigate("/sign-in");
    if (auth.currentUser) {
      const unsubcribe = onSnapshot(doc(db, "users", `${user}`), (doc) => {
        setSavedMovies(doc.data()?.savedMovies);
      });
      return () => {
        unsubcribe();
      };
    } else if (user != undefined) {
      instance
        .post("/v1/get-movie", {
          username: user.username,
        })
        .then((res) => {
          const savedMovies = res.data;
          setSavedMovies(savedMovies);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className="w-4/5 absolute left-2/4 -translate-x-2/4 sm:mt-[25%] md:mt-[15%] lg:mt-[10%] mt-[35%] flex flex-wrap gap-8 ml-[5%]">
      {savedMovies &&
        savedMovies.map((value, index) => {
          return <FavMovie key={index} movie={value} onClick={remove} />;
        })}
    </div>
  );
};

export default Favourite;
