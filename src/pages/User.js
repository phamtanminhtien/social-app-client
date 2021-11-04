import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BoxUpStatus from "../parts/home/BoxUpStatus";
import Friend from "../parts/home/Friend";
import FriendList from "../parts/home/FriendList";
import ListPost from "../parts/user/ListPost";
import { changeAvatar, userSelect } from "../reducers/userSlice";
import server, { getLinkMedia } from "../services/server";
import Title from "../uis/Title";
import getFullName from "../utils/getFullName";

function User() {
  const dispatcher = useDispatch();
  const user = useSelector(userSelect);
  const [uploadAvatar, setUploadAvatar] = useState(false);
  const { id } = useParams();
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [userPoint, setUserPoint] = useState(null);
  const inputRef = useRef(null);

  const reloadPost = () => {
    setTriggerUpdate(!triggerUpdate);
  };

  const handleClickChangeAvatar = () => {
    console.log("as");
    inputRef.current.click();
  };
  const handleChangeAvatar = (e) => {
    setUploadAvatar(true);
    const formData = new FormData();
    formData.append("photos", e.target.files[0]);
    server(true)
      .post("/media", formData)
      .then((result) => {
        if (!result.data.success) {
          setUploadAvatar(false);
          alert(result.data.message);
        } else {
          server(true)
            .post("/user/avatar", { id: result.data.load[0] })
            .then((result2) => {
              if (!result2.data.success) {
                alert(result2.data.message);
              } else {
                dispatcher(changeAvatar(result2.data.load));
              }
              setUploadAvatar(false);
            });
        }
      });
  };

  useEffect(() => {
    server()
      .get("/user/" + id)
      .then((result) => {
        if (!result.data.success) {
          window.location.replace("/");
        } else {
          setUserPoint(result.data.load);
        }
      });
  }, [id]);
  return (
    <div className="bg-gray-100 min-h-full">
      <input
        type="file"
        hidden
        ref={inputRef}
        onChange={handleChangeAvatar}
        accept="image/*"
      />
      <div className="flex flex-col min-h-full">
        <div className="container mx-auto grid grid-cols-12 gap-4 py-3 min-h-full">
          <div className="col-span-3"></div>
          <div className="col-span-6 z-10 min-h-full">
            {userPoint != null && (
              <div className="flex-1 mb-2">
                <div className="flex items-center flex-col">
                  <div className="w-40 h-40 rounded-full overflow-hidden m-3 relative group">
                    {uploadAvatar && (
                      <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-black opacity-40">
                        <div
                          className="animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10"
                          style={{ borderTopColor: "#3498db" }}
                        ></div>
                      </div>
                    )}
                    {!userPoint?.avatar ? (
                      <div className="flex justify-center items-center text-7xl w-full h-full bg-pink-500 text-white">
                        {userPoint.firstName.charAt(0).toUpperCase()}
                      </div>
                    ) : (
                      <>
                        {user != null && user._id === id ? (
                          <img
                            src={getLinkMedia(user?.avatar.meta.filename)}
                            alt={user.firstName}
                          />
                        ) : (
                          <img
                            src={getLinkMedia(userPoint?.avatar.meta.filename)}
                            alt={userPoint.firstName}
                          />
                        )}
                      </>
                    )}
                    {user != null && user._id === id && (
                      <div
                        onClick={handleClickChangeAvatar}
                        className="absolute top-0 left-0 right-0 bottom-0 flex cursor-pointer justify-center items-center duration-200 bg-black bg-opacity-0 opacity-0 text-white group-hover:opacity-100 group-hover:bg-opacity-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="">
                    <p className="text-5xl">
                      {getFullName(userPoint.firstName, userPoint.lastName)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {user && user._id === id && <BoxUpStatus reload={reloadPost} />}
            <ListPost reload={triggerUpdate} id={id} />
          </div>
          <div className="col-span-3"></div>
        </div>
        {user && user._id === id && (
          <div className="container mx-auto grid grid-cols-12 gap-4 py-3 fixed top-0 left-0 right-0 bottom-0">
            <div className="col-span-3">
              <Title text="Friends" />
              <Friend />
            </div>
            <div className="col-span-6 z-0"></div>
            <div className="col-span-3">{user && <FriendList />}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
