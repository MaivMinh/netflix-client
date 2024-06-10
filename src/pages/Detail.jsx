import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import instance from "../axios/themovieApi-axios-config";
import RightSide from "./RightSide";
import CardActor from "../components/CardActor";

const Detail = () => {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const [actor, setActor] = useState([]);
  const movieID = params.movieID;

  useEffect(() => {
    /* useEffect() để lấy thông tin của phim cụ thể. */
    instance
      .get(`/movie/${movieID}?language=en-US`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    instance.get(`/movie/${movieID}/credits?language=en-US`)
    .then(res => {
      setActor(res.data.cast.filter(element => {
        return (element.known_for_department.toLowerCase() === "acting");
      }));
    })
    .catch(err => {
      console.log(err.message);
    })
  }, []);

  
  return (
    <div className="">
      {movie != null && (
        <div className="w-4/5 absolute left-2/4 -translate-x-2/4 sm:mt-[25%] md:mt-[15%] lg:mt-[8%] mt-[35%] flex flex-row">
          <div className="left-side w-3/4 basis-3/4">
            <div className="w-full h-[500px] flex flex-row gap-x-10">
              <div className="movie-img w-[40%] h-full flex flex-col items-center justify-between gap-y-8">
                <img
                  className="w-full object-cover h-full rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 duration-300"
                  src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                />
                <div className="display-buttons flex flex-row gap-x-8">
                  <Link
                    className="px-4 py-2 rounded-xl bg-white text-black hover:bg-black hover:text-white active:scale-95 duration-200 border-[1px]"
                    to={`/play/${movieID}`}
                  >
                    Xem phim
                  </Link>
                  <Link
                    className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-500 active:scale-95 duration-200"
                    to={`/trailer/${movieID}`}
                  >
                    Trailers
                  </Link>
                </div>
              </div>
              <div className="infor-movie bg-[#2B2E4A] rounded-xl mr-8 w-[60%] flex flex-col items-start justify-start gap-y-6 pl-4">
                <div className="w-full text-red-500 py-4">
                  <h1 className="movie-title text-3xl font-bold">
                    {movie?.title}
                  </h1>
                  <p className="status text-2xl font-medium">
                    {movie?.tagline}
                  </p>
                </div>
                <div className="w-full h-full flex flex-col justify-start items-start gap-y-4">
                  <p className="run-time">
                    Run Time:{" "}
                    <span className="text-[#F67280]">{movie?.runtime}</span>
                  </p>
                  <p className="released-date">
                    Release Date:{" "}
                    <span className="text-[#F67280]">
                      {movie?.release_date}
                    </span>
                  </p>
                  <p className="vote-average">
                    Rating:{" "}
                    <span className="text-[#F67280]">
                      {movie?.vote_average}
                    </span>
                  </p>
                  <div className="genres">
                    Genres:
                    {movie?.genres.map((genre, index) => {
                      return (
                        <Link
                          to={`/genres/${genre.name}`}
                          className="pl-4 text-[#F67280]"
                          key={index}
                        >
                          {genre.name}
                        </Link>
                      );
                    })}
                  </div>
                  <p className="tag-line">
                    Overview:{" "}
                    <span className="text-[#F67280]">{movie?.overview}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[90%] h-[2px] bg-white ml-6 mt-16"></div>
            <div className="mt-16 ml-[2.5%] actors-related w-[90%] h-[250px] flex flex-row gap-x-6 overflow-x-scroll overflow-y-hidden ">
              {/* Hiển thị danh sách diễn viên tham gia. */}
              {actor.map(element => {
                return (
                  <CardActor actor={element} key={Math.random()} />
                );
              })}
            </div>
            <ReviewCard movieID={movieID} />
          </div>
          <RightSide />
        </div>
      )}
    </div>
  );
};

export default Detail;
