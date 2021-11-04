import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSelect } from "../../reducers/userSlice";
import { getLinkMedia, getLinkUser } from "../../services/server";
import getFullName from "../../utils/getFullName";

function UserInfo() {
  const user = useSelector(userSelect);

  return (
    <Link to={getLinkUser(user._id)}>
      <div
        className="w-full relative bg-center bg-contain rounded-xl overflow-hidden"
        style={{
          paddingTop: "100%",
          backgroundImage:
            "url(" + getLinkMedia(user?.avatar?.meta.filename) + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {!user.avatar && (
          <div className="top-0 left-0 right-0 bottom-0 absolute flex justify-center items-center bg-pink-500">
            <span className="text-white text-8xl">
              {user.firstName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div
          className="top-0 left-0 right-0 bottom-0 absolute overflow-hidden flex justify-end flex-col p-6"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.43461134453781514) 79%, rgba(0,0,0,1) 100%)",
          }}
        >
          <div className="">
            <span className="text-white text-xl font-medium">
              {getFullName(user.firstName, user.lastName)}
            </span>

            {user.username && (
              <span className="text-white text-xl">{" @" + user.username}</span>
            )}
          </div>
          <p className="text-white text-lg font-extralight">Address</p>
        </div>
      </div>
    </Link>
  );
}

export default UserInfo;
