import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactCodeInput from "react-verification-code-input";

const VerifyEmail = () => {
  const [code, setCode] = useState(null);
  const [result, setResult] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setCode(e);
  }

  function handleClick(e) {
    axios
      .request({
        url: "http://localhost:8080/auth/verify-email",
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        data: {
          code: code,
        },
      })
      .then((res) => {
        if (res.data.result) {
          setResult(true);
          navigate("/sign-in");
        } else {
          setResult(false);
        }
      });
  }

  return (
    <div className="relative w-full h-full">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/319e80c0-66aa-416c-9407-c7377a8c126a/VN-vi-20231204-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="Background"
      />
      <div className="absolute top-0 w-full h-full bg-black bg-opacity-70"></div>
      <div className="absolute top-[150px] w-2/4 h-1/3 bg-white -translate-x-2/4 left-2/4 flex flex-col items-center justify-center rounded-2xl gap-y-4  shadow-lg shadow-indigo-500/80">
        <p className="text-black font-mono text-3xl">
          Nhập mã xác nhận của bạn vào đây!
        </p>
        <ReactCodeInput type="text" onChange={handleChange} />
        {!result && (
          <p className="text-red-500 text-sm -ml-[150px] -mt-3">
            *Mã xác nhận không chính xác
          </p>
        )}
        {!loading ? (
          <button
            type="button"
            className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-mono"
            onClick={handleClick}
          >
            Xác nhận
          </button>
        ) : (
          <div
            role="status"
            className="py-2 mx-auto flex flex-row justify-center"
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
      </div>
    </div>
  );
};

export default VerifyEmail;
