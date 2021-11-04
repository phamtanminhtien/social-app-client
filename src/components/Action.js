import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, userSelect } from "../reducers/userSlice";

function Action() {
  const user = useSelector(userSelect);
  const dispatcher = useDispatch();

  const handleOnClickHome = () => {
    window.location.replace("/");
  };
  const handleOnClickLogout = () => {
    dispatcher(logout());
  };
  const handleOnClickProfile = () => {
    window.location.replace("/user/" + user._id);
  };
  return (
    <>
      <div className="m-10 bg-white shadow-xl flex fixed flex-col p-2 rounded-full">
        <div
          className="z-50 p-3 cursor-pointer border transition border-red-300 text-red-500 rounded-full hover:border-red-700 hover:bg-red-100"
          onClick={handleOnClickHome}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </div>
        {user && (
          <>
            <div
              className="z-50 p-3 cursor-pointer border transition border-red-300 text-red-500 rounded-full hover:border-red-700 hover:bg-red-100 mt-1"
              onClick={handleOnClickProfile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div
              className="z-50 p-3 cursor-pointer border transition border-red-300 text-red-500 rounded-full hover:border-red-700 hover:bg-red-100 mt-1"
              onClick={handleOnClickLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Action;
