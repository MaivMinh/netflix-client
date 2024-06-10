import React, { useState } from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Request";
import { UserAuth } from "../context/AuthContextProvider";

const Home = () => {
  return (
    <div className="">
      <Main />
      <Row rowID="1" title="Now Playing" request={requests.NowPlaying} />
      <Row rowID="2" title="Top Rating" request={requests.TopRated} />
      <Row rowID="3" title="Up Coming" request={requests.Upcoming} />
      <Row rowID="4" title="Trending" request={requests.Trending} />
    </div>
  );
};

export default Home;
