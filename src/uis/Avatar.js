import React from "react";

function Avatar(props) {
  return (
    <div className="bg-pink-500 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl">
      {props.name ? props.name.charAt(0).toUpperCase() : "A"}
    </div>
  );
}

export default Avatar;
