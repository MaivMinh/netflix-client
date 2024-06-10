import React from "react";

const Review = (props) => {
  const review = props.review;
  return (
    <div className="flex flex-col gap-8 items-start justify-start mb-8 border-b-2 border-white">
      <div className="flex flex-row items-center justify-start gap-x-4 text-[20px]">
        <p className="text-[#DCD6F7] author pr-4 border-r-2 border-white">{review.author}</p>
        <p className="text-[#DCD6F7]">
          Rating: <span className="text-[#DCD6F7]">{review.author_details.rating}</span>
        </p>
      </div>
      <p className="mb-4">{review.content}</p>
    </div>
  );
};

export default Review;
