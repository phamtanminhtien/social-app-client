import React from "react";

function Title({ text }) {
  return (
    <div className="my-3 border-b border-gray-300">
      <span className="border-b-4 px-3 inline-block border-blue-700">
        {text}
      </span>
    </div>
  );
}

export default Title;
