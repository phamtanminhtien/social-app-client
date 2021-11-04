import React from "react";

function Button(props) {
  return (
    <button
      {...props}
      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 duration-200 text-white text-base rounded-sm"
    >
      {props.text && props.text}
    </button>
  );
}

export default Button;
