import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserAuth } from "../context/AuthContextProvider";

const SignUp = () => {
  const { user, setUser } = UserAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState({
    email: "",
    username: "",
    password: "",
  });

  function handleChange(e) {
    setAccount(() => {
      return {
        ...account,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    axios
      .request({
        method: "POST",
        url: "https://netflix-server.azurewebsites.net/auth/verify",
        headers: {
          "Content-Type": "Application/json",
        },
        data: {
          email: account.email,
          username: account.username,
          password: account.password,
        },
      })
      .then((res) => {
        // Gửi email thành công.
        setLoading(false);
        navigate("/verify-email");
      })
      .catch((error) => {
        // Gửi email thất bại.
        setLoading(false);
        navigate("/sign-up");
      });
  }

  return (
    <div className="h-screen w-ful">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/319e80c0-66aa-416c-9407-c7377a8c126a/VN-vi-20231204-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        className="hidden sm:block w-full h-full opacity-40 object-cover"
        alt=""
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[450px] absolute top-[80px] left-2/4 -translate-x-2/4 h-[90%] gap-y-8 bg-black bg-opacity-70 rounded-2xl items-start px-[5%] pt-[3%]"
      >
        <p className="mt-4 w-4/5 text-white text-3xl rounded-t-2xl">Đăng ký</p>
        <div className="flex flex-col gap-y-4 w-full">
          <input
            onChange={handleChange}
            value={account.email}
            className="w-[100%] h-[45px] bg-[#333] pl-4 rounded-md"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <input
            className="w-[100%] h-[45px] bg-[#333] pl-4 rounded-md"
            type="text"
            value={account.username}
            name="username"
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />

          <input
            onChange={handleChange}
            value={account.password}
            className="w-[100%] h-[45px] bg-[#333] pl-4 rounded-md"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="flex flex-col justify-between items-center w-full gap-y-4">
          {!loading ? (
            <button
              type="submit"
              className="text-xl bg-red-600 rounded-md w-full text-center py-2"
            >
              Đăng ký
            </button>
          ) : (
            <div
              role="status"
              className="w-full py-2 mx-auto flex flex-row justify-center"
            >
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
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
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex-1 flex flex-row gap-x-2 items-center">
              <input
                className="cursor-pointer"
                id="remember-me"
                type="checkbox"
              />
              <label
                htmlFor="remember-me"
                className="text-gray-400 cursor-pointer"
              >
                Ghi nhớ tôi
              </label>
            </div>
            <Link className="flex-1 text-right text-gray-400" to="/help">
              Bạn cần trợ giúp?
            </Link>
          </div>
          <div className="flex flex-row gap-x-2 self-start justify-start">
            <p className="text-gray-400">Bạn đã có tài khoản?</p>
            <Link to="/sign-in">Đăng nhập ngay</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
