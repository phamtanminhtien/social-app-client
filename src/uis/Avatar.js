import React from "react";
import { Link } from "react-router-dom";
import { getLinkUser } from "../services/server";

const getSize = (size = "md") => {
  switch (size) {
    case "sm":
      return "w-8 h-8";
    case "md":
      return "w-12 h-12";
    case "lg":
      return "w-16 h-16";
    default:
      break;
  }
};

function Avatar(props) {
  return (
    <Link to={getLinkUser(props._id)}>
      <div
        className={
          "bg-pink-500 text-white flex items-center justify-center rounded-full text-xl overflow-hidden " +
          getSize(props.size)
        }
      >
        {!props.src ? (
          props.name.charAt(0).toUpperCase()
        ) : (
          <img src={props.src} alt={props.name} />
        )}
      </div>
    </Link>
  );
}

export default Avatar;
