import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import { UserAuth } from "../context/AuthContextProvider";
import GoogleButton from "react-google-button";
import FacebookLogin from "react-facebook-login";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import firebaseDb from "../firebase/firebase.db";
import { googleProvider } from "../firebase/google-config";
import { facebookProvider } from "../firebase/facebook-config";
import authAxios from "../axios/authAxios-config";

const SignIn = () => {
  const { user, setUser } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user != undefined) navigate("/");
  });

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    // get infor from user's input data.
    authAxios
      .request({
        url: "/auth/login",
        method: "POST",
        data: {
          user: account,
        },
      })
      .then((res) => {
        // Lấy data từ server gửi về rồi lưu vào authUser.
        const data = res.data;
        setUser(data);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setUser(undefined);
        setErr(true);
        navigate("/sign-in");
      });
  }
  function handleChange(e) {
    setAccount(() => {
      return {
        ...account,
        [e.target.name]: e.target.value,
      };
    });
  }

  function googleHandleSignIn() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function facebookHandleSignIn() {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
      });
  }

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setUser(currentUser.uid);
      firebaseDb.addNewUser(currentUser.uid);
      navigate("/");
    }
  });

  return (
    <div className="h-screen w-ful">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/319e80c0-66aa-416c-9407-c7377a8c126a/VN-vi-20231204-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        className="hidden sm:block w-full h-full opacity-40 object-cover"
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[450px] absolute top-[80px] left-2/4 -translate-x-2/4 pb-[3%] gap-y-8 bg-black bg-opacity-70 rounded-2xl items-start px-[5%] pt-[3%]"
      >
        <p className="mt-4 w-4/5 text-white text-3xl rounded-t-2xl">
          Đăng nhập
        </p>

        <div className="flex flex-col gap-y-4 w-full relative">
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
            className="w-[100%] h-[45px] bg-[#333] pl-4 rounded-md"
            type="password"
            value={account.password}
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          {err ? (
            <p className="text-sm text-red-500 text-left italic absolute -bottom-[20%]">
              Email or password is incorrect!
            </p>
          ) : null}
        </div>

        <div className="flex flex-col justify-between items-center w-full gap-y-4">
          {!loading ? (
            <button
              type="submit"
              className="text-xl bg-red-600 rounded-md w-full text-center py-2"
            >
              Đăng nhập
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
            <p className="text-gray-400">Bạn mới tham gia Netflix?</p>
            <Link to="/sign-up">Đăng kí ngay</Link>
          </div>
        </div>
        <GoogleButton
          onClick={googleHandleSignIn}
          className="w-full"
          type="dark"
        />
        <FacebookLogin onClick={facebookHandleSignIn} size="medium" />
      </form>
    </div>
  );
};

export default SignIn;
