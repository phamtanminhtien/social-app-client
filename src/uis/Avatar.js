import React from "react";

function Avatar(props) {
  return (
    <div className="bg-pink-500 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl overflow-hidden">
      {!props.src ? (
        props.name.charAt(0).toUpperCase()
      ) : (
        <img src={props.src} alt={props.name} />
      )}
    </div>
  );
}

export default Avatar;
