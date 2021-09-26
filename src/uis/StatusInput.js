import React from "react";

function StatusInput({ firstName, content, setContent }) {
  const handleOnChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <textarea
      placeholder={"Hi " + firstName + "! What's on your mind"}
      className="text-xl w-full focus:outline-none"
      style={{ minHeight: 80 }}
      onChange={handleOnChange}
      value={content}
    ></textarea>
  );
}

export default StatusInput;
