import React, { useState, useEffect } from "react";
import instance from "../axios/themovieApi-axios-config";
import { BiDetail } from "react-icons/bi";
import { GiFilmSpool } from "react-icons/gi";
import { Link } from "react-router-dom";

const PersonItem = (props) => {
  /* Components này giành cho thẻ phim ở các Categories phần sidebar, không phải bên phần Favourite. 
  Với mục đích là cho phần thẻ phim nó khác với bên favourite thôi.
  */
  const id = props.id; // Tìm thông tin chi tiết thông qua id.
  const [infor, setInfor] = useState(undefined);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    // Lấy dữ liệu phim.
    instance
      .get(`/person/${id}`)
      .then((res) => {
        setInfor(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(infor?.profile_path);

  function handleOptionClick(e) {
    setSelected(!selected);
  }

  return (
    <div className="flex flex-row w-3/4 h-[300px] bg-[#222831] rounded-xl border-b-2 border-white">
      <div className="basis-1/4 bg-blue-400 h-full rounded-l-xl cursor-pointer relative">
        <img
          className="object-cover h-full w-full rounded-l-xl"
          src={
            infor?.profile_path != undefined
              ? `https://image.tmdb.org/t/p/original${infor.profile_path}`
              : "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png"
          }
        />
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
              ? "h-[35%] w-[65%] top-10 right-10 absolute flex flex-col justify-center rounded-xl bg-white"
              : "hidden"
          }
        >
          <Link className="flex flex-row items-center w-full bg-white text-black font-semibold justify-center text-center hover:cursor-pointer hover:bg-red-500 hover:text-white basis-1/2 rounded-t-xl hover:rounded-xl"
          to={`/person/${infor?.id}`}>
            <BiDetail className="mr-2" />
            Detail
          </Link>
          <Link className="flex flex-row items-center w-full bg-white text-black font-semibold justify-center text-center rounded-b-xl hover:cursor-pointer hover:bg-red-500 hover:text-white basis-1/2 hover:rounded-xl"
          to={`/related-film/${infor?.id}`}>
            <GiFilmSpool className="mr-2" />
            Related Film
          </Link>
        </div>
      </div>
      <div className="content basis-3/4  h-full rounded-r-xl py-4 pl-4 flex flex-col justify-between items-start overflow-x-hidden overflow-y-scroll scrollbar-hide gap-y-4">
        <p className="text-3xl font-semibold">Name: {infor?.name}</p>
        <div>
          <span className="text-white text-2xl font-semibold italic mr-2">
            Biography:
          </span>{" "}
          {infor?.biography}
        </div>
        <p><span className="text-white text-xl font-semibold italic mr-2">Birth date:</span> {infor?.birthdate}</p>
        <p><span className="text-white text-xl font-semibold italic mr-2">Known for Department:</span> {infor?.known_for_department}</p>
        <p><span className="text-white text-xl font-semibold italic mr-2">Place of Birth:</span> {infor?.place_of_birth}</p>
      </div>
    </div>
  );
};

export default PersonItem;
