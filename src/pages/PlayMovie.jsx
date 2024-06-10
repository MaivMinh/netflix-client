import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContextProvider";

const PlayMovie = () => {
  const { user, setUser } = UserAuth();
  const params = useParams();
  const id = params.movieID;
  const navigate = useNavigate();
  useEffect(() => {
    if (user == undefined) {
      navigate("/sign-in");
    }
  });

  return <div className="text-white"></div>;
};

export default PlayMovie;
