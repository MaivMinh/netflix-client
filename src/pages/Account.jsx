import React from "react";
import { UserAuth } from "../context/AuthContextProvider";
import authAxios from "../axios/authAxios-config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Account = () => {
  const { user, setUser } = UserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user == undefined) {
      navigate("/sign-in");
    }
  });

  function handleClick(e) {
    
    
  }

  return (
    <div className="absolute sm:mt-[120px] mt-[150px]">
      <button className="text-3xl text-red-500" onClick={handleClick}>
        Get Accounts
      </button>
    </div>
  );
};

export default Account;
