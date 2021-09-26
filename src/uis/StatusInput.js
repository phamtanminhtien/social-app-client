import React from "react";

function StatusInput({ content, setContent }) {
  const handleOnChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <textarea
      placeholder="What's on your mind"
      className="text-xl w-full focus:outline-none"
      style={{ minHeight: 80 }}
      onChange={handleOnChange}
      value={content}
    ></textarea>
  );
}

export default StatusInput;
