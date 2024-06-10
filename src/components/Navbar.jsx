import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { UserAuth } from "../context/AuthContextProvider";
import authAxios from "../axios/authAxios-config";
import instance from "../axios/themovieApi-axios-config";

function Navbar() {
  const { user, setUser, setSearchResult } = UserAuth();
  const navigate = useNavigate();
  async function logOut() {
    try {
      if (auth.currentUser) {
        signOut(auth)
          .then(() => {
            setUser(undefined);
            navigate("/sign-in");
          })
          .catch((error) => console.log(error.message));
      } else if (user != undefined) {
        await authAxios
          .post("/auth/logout")
          .then((res) => {
            setUser(undefined);
          })
          .catch((err) => {
            navigate("/sign-in");
          });
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleClick(e) {
    e.preventDefault();
    let select = e.target.select.value;
    let infor = e.target.infor.value;
    if (select == "film") {
      instance
        .get(`/search/movie?query=${infor}&language=en-US&page=1`)
        .then((res) => {
          const data = {
            ...res.data,
            type: "film", 
            "infor": infor,
          }
          setSearchResult(data);
        })
        .catch((err) => console.log(err));
      } else if (select == "actor") {
        instance
        .get(`/search/person?query=${infor}&language=en-US&page=1`)
        .then((res) => {
          const data = {
            ...res.data,
            type: "actor",
            "infor": infor,
          }
          setSearchResult(data);
        })
        .catch((err) => console.log(err));
    }
    navigate("/search");
  }

  return (
    <nav className="flex flex-row justify-between py-4 px-[5%] border-b-[1px] rounded-b-2xl items-center bg-transparent z-10 absolute top-0 left-0 right-0">
      <Link className="text-red-600 font-bold text-5xl cursor-pointer" to="/">
        METFLIX
      </Link>
      <div className="flex flex-row items-center group">
        <form
          class="w-full mx-auto opacity-50 group-hover:opacity-100"
          onSubmit={handleClick}
        >
          <div class="flex">
            <select
              className="rounded-l-lg border-none bg-[#374151] text-white pl-2"
              name="select"
            >
              <option value={"film"}>Movies</option>
            <option value={"actor"}>Persons</option>
            </select>
            <div class="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                name="infor"
                class="block p-2.5 w-[350px] z-20 text-sm text-white bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:border-blue-500"
                placeholder="Search Movies, TV Series, Persons..."
                required
              />
              <button
                type="submit"
                class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-red-500 rounded-e-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      {user == undefined ? (
        <ul className="flex flex-row gap-x-6 items-center justify-between">
          <Link
            className="px-2 py-[7px] text-white border-[1px] border-white rounded-xl cursor-pointer hover:bg-white hover:text-black"
            to="/sign-up"
          >
            Đăng Kí
          </Link>
          <Link
            className="px-2 py-2 text-white border-none rounded-xl cursor-pointer bg-red-600 hover:bg-red-700"
            to="/sign-in"
          >
            Đăng Nhập
          </Link>
        </ul>
      ) : (
        <ul className="flex flex-row gap-x-6 items-center justify-between">
          <Link
            className="px-2 py-[7px] text-white rounded-2xl cursor-pointer hover:bg-red-500 hover:text-[#F6F6F6] text-xl"
            to={"/favourite"}
          >
            Phim yêu thích
          </Link>
          <div className="h-9 border-red-500 rounded-2xl border-[1px]"></div>
          <Link
            className="px-2 py-[7px] text-white border-[1px] border-white rounded-xl cursor-pointer hover:bg-white hover:text-black "
            to="/account"
          >
            Tài khoản
          </Link>
          <button
            className="px-2 py-2 text-white border-none rounded-xl cursor-pointer bg-red-600 hover:bg-red-700"
            onClick={logOut}
          >
            Đăng Xuất
          </button>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
