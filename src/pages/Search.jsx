import React, { useState } from "react";
import { UserAuth } from "../context/AuthContextProvider";
import FilmItem from "../components/FilmItem";
import PersonItem from "../components/PersonItem";
import Pagination from "../components/Pagination";

const Search = () => {
  const { searchResult, setSearchResult } = UserAuth();

  function sortByPopularity(arr) {
    // Hàm sắp xếp theo độ phổ biến của diễn viên.
    for (let i = 1; i < arr.length; i++) {
      let temp = arr[i]; // temp.
      for (let j = i - 1; j >= 0; j--) {
        if (arr[j].popularity >= temp.popularity) {
          // Dừng sắp xếp.
          arr[j + 1] = temp;
          break;
        } else {
          // Dịch chuyển arr[j] lên phía trước.
          arr[j + 1] = arr[j];
          if (j == 0) {
            // Dừng.
            arr[j] = temp;
            break;
          }
        }
      }
    }
  }

  function sortByVoteAverage(arr) {
    // hàm sắp xếp theo điểm vote của phim.
    for (let i = 1; i < arr.length; i++) {
      let temp = arr[i]; // temp.
      for (let j = i - 1; j >= 0; j--) {
        if (arr[j].vote_average >= temp.vote_average) {
          // Dừng sắp xếp.
          arr[j + 1] = temp;
          break;
        } else {
          // Dịch chuyển arr[j] lên phía trước.
          arr[j + 1] = arr[j];
          if (j == 0) {
            // Dừng.
            arr[j] = temp;
            break;
          }
        }
      }
    }
  }

  const arr = searchResult != undefined ? searchResult.results : null;
  if (searchResult) {
    if (searchResult.type == "film") sortByVoteAverage(arr);
    else sortByPopularity(arr);
  }

  return (
    <div className="search absolute sm:mt-[25%] md:mt-[15%] lg:mt-[10%] mt-[35%] flex flex-col gap-8 mx-[5%] w-[90%] justify-center items-center">
      {searchResult != undefined && searchResult.results.length != 0 ? (
        <div className="flex flex-col w-full gap-y-20 items-center">
          {/* Trường hợp có dữ liệu tìm kiếm. */}
          {searchResult.type == "film"
            ? arr.map((element) => {
                return (
                  <FilmItem
                    key={Math.random()}
                    id={element.id}
                  />
                );
              })
            : arr.map((element) => {
                if (element.popularity != 0) {
                  return <PersonItem key={Math.random()} id={element.id} />;
                }
                return null;
              })}
        </div>
      ) : (
        <div className="w-screen">
          {/* Trường hợp không có dữ liệu tìm kiếm. */}
          <h1 className="w-full text-3xl text-center">
            Không tìm thấy dữ liệu tìm kiếm
          </h1>
        </div>
      )}

      {/* Pagination */}
      {searchResult != undefined && searchResult.results.length != 0 ? (
        <Pagination setSearchResult={setSearchResult}  />
      ) : null}
    </div>
  );
};

export default Search;
