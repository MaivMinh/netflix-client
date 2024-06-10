import React from "react";
import { Link } from "react-router-dom";

const CardActor = ({ actor }) => {
  return (
    <div className="relative h-full group">
      <img
        className="h-full w-[220px] object-fill max-w-none rounded-md hover:cursor-pointer"
        src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
      />
      <Link className="group-hover:block hover:cursor-pointer hidden absolute top-0 rounded-md h-full w-full bg-black bg-opacity-25 "
        to={`/actor/${actor.id}`}
      >
        <p className="text-[20px] p-2 bg-black text-white bottom-0 absolute w-full">{actor.name}</p>
      </Link>
    </div>
  );
};

export default CardActor;
