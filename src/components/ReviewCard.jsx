import React, { useEffect } from "react";
import { useState } from "react";
import instance from "../axios/themovieApi-axios-config";
import Review from "./Review";

const ReviewCard = ({ movieID }) => {
  const [reviews, setReviews] = useState(null);

  let page = 1;
  function setPage(value) {
    page = value;
  }

  useEffect(() => {
    instance
      .get(`movie/${movieID}/reviews?language=en-US&page=${page}&per_page=3`)
      .then((res) => {
        setReviews(res.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function handleClick(e) {
    const value = e.target.value;
    if (value == -1) {
      if (page != 1) setPage(page - 1);
      else setPage(1);
    } else if (value == 1 || value == 2) {
      setPage(value);
    } else setPage(page + 1);
    instance
      .get(`/movie/${movieID}/reviews?language=en-US&page=${page}&per_page=3`)
      .then((res) => {
        setReviews(res.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="reviews mt-16 w-[90%] ml-[2.5%] max-h-[700px] overflow-x-hidden overflow-y-scroll scroll-smooth scrollbar-hide px-8 py-8 bg-[#424874] bg-opacity-70 text-white mb-[100px] rounded-2xl">
      <span className="mb-10 text-red-600 text-2xl font-semibold">REVIEWS</span>
      {reviews != null
        ? reviews.map((review, index) => {
            return <Review key={index} review={review} />;
          })
        : null}
      <div className="pagination w-full text-center">
        <button
          value={-1}
          onClick={handleClick}
          className="px-4 py-1 border-2 rounded-xl border-[#F6F6F6] ml-3 hover:bg-[#F6F6F6] hover:text-[#424874]"
        >
          Prev
        </button>
        <button
          value={1}
          onClick={handleClick}
          className="px-4 py-1 border-2 rounded-xl border-[#F6F6F6] ml-3 hover:bg-[#F6F6F6] hover:text-[#424874]"
        >
          1
        </button>
        <button
          value={2}
          onClick={handleClick}
          className="px-4 py-1 border-2 rounded-xl border-[#F6F6F6] ml-3 hover:bg-[#F6F6F6] hover:text-[#424874]"
        >
          2
        </button>
        <button
          value={"next"}
          onClick={handleClick}
          className="px-4 py-1 border-2 rounded-xl border-[#F6F6F6] ml-3 hover:bg-[#F6F6F6] hover:text-[#424874]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
