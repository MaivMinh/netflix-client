import React, { useState } from "react";
import { UserAuth } from "../context/AuthContextProvider";
import instance from "../axios/themovieApi-axios-config";
import { useNavigate } from "react-router-dom";

const Pagination = ({ url, setSearchResult }) => {
  const [number, setNumber] = useState(1);
  const { searchResult } = UserAuth();
  const navigate = useNavigate();
  // console.log(searchResult?.total_pages);

  function handleClick(e) {
    let value = e.target.value;
    // nạp dữ liệu và gửi vào infor.
    if (searchResult?.type == "film") {
      const infor = searchResult.infor;
      instance
        .get(`/search/movie?query=${infor}&language=en-US&page=${value}`)
        .then((res) => {
          const data = {
            ...res.data,
            type: "film",
            infor: infor,
          };
          setSearchResult(data);
        })
        .catch((err) => console.log(err));
    } else if (searchResult?.type == "actor") {
      const infor = searchResult.infor;
      instance
        .get(`/search/person?query=${infor}&language=en-US&page=${value}`)
        .then((res) => {
          const data = {
            ...res.data,
            type: "actor",
            infor: infor,
          };
          setSearchResult(data);
        })
        .catch((err) => console.log(err));
    }
    setNumber(value);
    navigate("/search");
  }
  function handleDecrease(e) {
    if (number <= 1) {
      return;
    } else {
      const value = number - 1;
      if (searchResult?.type == "film") {
        const infor = searchResult.infor;
        instance
          .get(`/search/movie?query=${infor}&language=en-US&page=${value}`)
          .then((res) => {
            const data = {
              ...res.data,
              type: "film",
              infor: infor,
            };
            setSearchResult(data);
          })
          .catch((err) => console.log(err));
      } else if (searchResult?.type == "actor") {
        const infor = searchResult.infor;
        instance
          .get(`/search/person?query=${infor}&language=en-US&page=${value}`)
          .then((res) => {
            const data = {
              ...res.data,
              type: "actor",
              infor: infor,
            };
            setSearchResult(data);
          })
          .catch((err) => console.log(err));
      }
      setNumber(value);
      navigate("/search");
    }
  }
  const totals = searchResult?.total_pages;
  function handleIncrease(e) {
    if (number >= totals) {
      return;
    } else {
      const value = number + 1;
      if (searchResult?.type == "film") {
        const infor = searchResult.infor;
        instance
          .get(`/search/movie?query=${infor}&language=en-US&page=${value}`)
          .then((res) => {
            const data = {
              ...res.data,
              type: "film",
              infor: infor,
            };
            setSearchResult(data);
          })
          .catch((err) => console.log(err));
      } else if (searchResult?.type == "actor") {
        const infor = searchResult.infor;
        instance
          .get(`/search/person?query=${infor}&language=en-US&page=${value}`)
          .then((res) => {
            const data = {
              ...res.data,
              type: "actor",
              infor: infor,
            };
            setSearchResult(data);
          })
          .catch((err) => console.log(err));
      }
      setNumber(value);
      navigate("/search");
    }
  }
  let l, h;
  if (number % 5 != 0) {
    l = Math.floor(number / 5) * 5 + 1;
    h = (Math.floor(number / 5) + 1) * 5;
  } else {
    l = Math.floor(number / 5 - 1) * 5 + 1;
    h = Math.floor(number / 5) * 5;
  }
  if (h > searchResult?.total_pages) h = searchResult.total_pages;

  const arr = [];
  for (let i = l; i <= h; i++) {
    arr.push(i);
  }

  return (
    <div className="flex flex-row gap-[2px] bg-black">
      <button
        className="rounded-l-xl p-3 bg-white text-black hover:bg-red-500 hover:text-white font-semibold"
        onClick={handleDecrease}
      >
        {"<<"}
      </button>
      {arr.map((element) => {
        if (element != number) {
          return (
            <button
              className="p-3 bg-white text-black hover:bg-red-500 hover:text-white font-semibold"
              onClick={handleClick}
              value={element}
              key={Math.random()}
            >
              {element}
            </button>
          );
        } else {
          return (
            <button
              className="p-3 bg-[#1AACAC] text-white hover:bg-red-500 hover:text-white font-semibold"
              onClick={handleClick}
              value={element}
              key={Math.random()}
            >
              {element}
            </button>
          );
        }
      })}
      <button
        className="rounded-r-xl p-3 bg-white text-black hover:bg-red-500 hover:text-white font-semibold"
        onClick={handleIncrease}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
