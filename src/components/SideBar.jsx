import React from "react";
import SideBarLink from "./SideBarLink";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";

const SideBar = () => {
  const navigate = useNavigate();
  async function logOut() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }



  return (
    <div className="w-[1px] hover:w-[230px] duration-100 h-full bg-[#010000] fixed z-50 bg-opacity-90 flex flex-col group rounded-tr-xl rounded-br-xl">
      <SlArrowRight fontSize={32} fontWeight={'bold'} className="absolute top-2/4 -translate-y-2/4 ml-1 text-white group-hover:hidden cursor-pointer" />
      <div className="group-hover:flex hidden flex-col items-start ml-[5%] justify-start w-full mt-[100px] sm:mt-[100px] md:mt-20 whitespace-nowrap overflow-y-scroll scrollbar-hide scroll-smooth">
        <SideBarLink content="Trang Chủ" to="/" />
        <p className="border-[1px] border-red-500 w-4/5 ml-3"></p>
        <SideBarLink content="Phim Yêu Thích" to="/favourite" />
        <SideBarLink content="Phim Mới" to="/newest" />
        <SideBarLink content="Phim Bộ" to="/drama" />
        <SideBarLink content="Phim Lẻ" to="/single" />
        <SideBarLink content="Phim Thuyết Minh" to="/voice-over" />
        <SideBarLink content="Phim Chiếu Rạp" to="/movies" />
        <SideBarLink content="TV Shows" to="/movie" />
        <SideBarLink content="Tài Khoản" to="/account" />
      </div>
    </div>
  );
};

export default SideBar;
