import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../axios/themovieApi-axios-config";
import { Link } from "react-router-dom";
import TrailerItem from "../components/TrailerItem";
import Review from "../components/Review";
import ReviewCard from "../components/ReviewCard";
import RightSide from "./RightSide";

const Trailer = () => {
  const params = useParams();
  const movieID = params.movieID;
  const [movie, setMovie] = useState(undefined);
  const [list, setList] = useState([]);
  const [currentDisplay, setCurrentDisplay] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(undefined);

  useEffect(() => {
    instance
      .get(`/movie/${movieID}/videos?language=en-US`)
      .then((res) => {
        const results = res.data.results;
        setList(results);
        const element = results.find((element) => {
          return element.type.toLowerCase() === "clip";
        });
        setMovie(element);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setCurrentDisplay(
          getSrcYoutube(`https://www.youtube.com/watch?v=${element?.key}`)
        );
      })
      .catch((err) => {
        console.log(err.message);
      });

    instance
      .get(`/movie/${movieID}`)
      .then((res) => {
        setInfo(res.data.title);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function getSrcYoutube(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const ID = match && match[2].length === 11 ? match[2] : null;
    return "https://www.youtube.com/embed/" + ID;
  }

  return (
    <div className="absolute sm:mt-[25%] md:mt-[15%] lg:mt-[10%] xl:mt-[5%] w-screen bg-[#333]">
      <div className="w-4/5 h-full absolute left-2/4 -translate-x-2/4 sm:mt-[10%] md:mt-[10%] lg:mt-[10%] xl:mt-[5%] flex flex-row gap-x-6">
        <div className="left-side w-3/4 h-full">
          {!loading ? (
            <div>
              <iframe
                className="w-full xl:h-[700px] lg:h-[500px] md:h-[350px] sm:h-[200px] rounded-xl"
                src={currentDisplay}
              ></iframe>
              <div className="flex flex-row justify-between items-center py-6">
                <div className="flex flex-row gap-x-4 items-center">
                  <p className="text-2xl font-semibold">{info}</p>
                  <div className="w-1 h-8 bg-white"></div>
                  <p className="title text-2xl font-semibold">{movie?.name}</p>
                </div>
                <Link
                  className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-500 active:scale-95 duration-200 text-2xl mr-8"
                  to={`/play/${movieID}`}
                >
                  Xem ngay
                </Link>
              </div>
              {!loading && (
                <div className="trailers w-full overflow-x-scroll overflow-y-hidden whitespace-nowrap scrollbar-hide rounded-xl flex flex-row gap-x-6 bg-black py-4 px-2">
                  {list.map((element) => {
                    return (
                      <TrailerItem
                        key={Math.random()}
                        src={getSrcYoutube(
                          `https://www.youtube.com/watch?v=${element?.key}`
                        )}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div role="status" className="flex flex-row justify-center">
              <svg
                aria-hidden="true"
                className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          )}
          <ReviewCard movieID={movieID} />
        </div>
        <RightSide />
      </div>
    </div>
  );
};

export default Trailer;
