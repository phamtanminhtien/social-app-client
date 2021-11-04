import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSelect } from "../reducers/userSlice";
import server, { getLinkMedia, getLinkUser } from "../services/server";
import Avatar from "../uis/Avatar";
import Button from "../uis/Button";
import timeForPost from "../utils/formatDayTime";
import Comment from "./Comment";

function Post({ data }) {
  const user = useSelector(userSelect);
  const [like, setLike] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();
  const [loadingComment, setLoadingComment] = useState(false);
  const [loadedComment, setLoadedComment] = useState(false);
  const [likeCount, setLikeCount] = useState(data.like.length);
  useEffect(() => {
    if (user != null) {
      if (data.like.includes(user._id)) setLike(true);
    }
  }, [setLike, data, user]);

  const handleOnClickLike = () => {
    setLike(!like);
    const status = !like ? "like" : "unlike";
    server(true)
      .post("/post/like", { postId: data._id, status: status })
      .then(() => {
        server()
          .get("/post/get-like/" + data._id)
          .then((result) => {
            if (!result.data.success) {
              alert(result.data?.message);
            } else {
              setLikeCount(result.data.load.count);
            }
          });
      });
  };

  const handleOnClickLoadComment = () => {
    setLoadingComment(true);
    server(true)
      .get("/comment/post/" + data._id)
      .then((result) => {
        if (!result.data.success) {
          alert(result.data?.message);
        } else {
          setComments(result.data.load);
          setLoadedComment(true);
        }
        setLoadingComment(false);
      });
  };

  const handleOnSubmitComment = () => {
    server(true)
      .post("/comment", { content: comment, postId: data._id })
      .then((result) => {
        if (!result.data.success) {
          alert(result.data?.message);
        } else {
          handleOnClickLoadComment();
          setComment("");
        }
      });
  };
  return (
    <div className="bg-white rounded shadow-md p-5 relative my-2">
      <div className="flex gap-2">
        <div>
          {user != null && user._id === data.userId._id ? (
            <Avatar
              _id={user._id}
              name={user.firstName}
              src={getLinkMedia(user?.avatar?.meta?.filename)}
            />
          ) : (
            <Avatar
              _id={data.userId._id}
              name={data.userId.firstName}
              src={getLinkMedia(data.userId?.avatar?.meta?.filename)}
            />
          )}
        </div>
        <div className="flex-1">
          <Link to={getLinkUser(data.userId._id)}>
            <span className="text-lg font-semibold leading-3 block hover:underline">
              {data.userId.firstName + " " + data.userId.lastName}
            </span>
          </Link>
          <span className="text-xs font-normal text-gray-500">
            {timeForPost(data.createdAt)}
          </span>
        </div>
        {user != null && user._id === data.userId._id && (
          <div className="h-10 w-10 text-gray-500 bg-gray-200 flex justify-center items-center rounded-full cursor-pointer hover:bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="my-3">
        {data.content && (
          <div className="my-1">
            <p className="break-all">{data.content}</p>
          </div>
        )}
        <div
          className={
            "flex flex-wrap -mb-2 " +
            (data.media.length === 1 ? "-mx-5" : "-mx-6")
          }
        >
          {data.media.length > 0 &&
            data.media.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    data.media.length !== 1 ? "md:w-1/2 px-1 mb-2" : ""
                  }
                >
                  <img
                    className={
                      "min-h-full min-w-full object-cover " +
                      (data.media.length !== 1 ? "max-h-80" : "")
                    }
                    src={getLinkMedia(item?.meta?.filename)}
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
      {user != null && (
        <div className="flex my-4 border-t border-gray-300 pt-1 -mb-9">
          <div
            className="flex-1 flex justify-center items-center p-1 cursor-pointer rounded-md hover:bg-gray-300 duration-200"
            onClick={handleOnClickLike}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={
                "duration-150 h-6 w-6 " +
                (like ? "text-red-500" : "text-gray-500")
              }
              viewBox="0 0 24 24"
              fill={like ? "currentColor" : "none"}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{likeCount}</span>
          </div>
          <div
            className="flex-1 flex justify-center items-center p-1 cursor-pointer rounded-md hover:bg-gray-300 duration-200"
            onClick={handleOnClickLoadComment}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>
        </div>
      )}
      <div className="relative mt-10">
        {user != null && (
          <div className="flex mt-10 border-t border-gray-300 pt-2 items-center">
            <div className="mr-2">
              <Avatar
                _id={user._id}
                size="sm"
                name={user.firstName}
                src={getLinkMedia(user?.avatar?.meta?.filename)}
              />
            </div>
            <div className="flex-1 mr-2">
              <textarea
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                className="w-full bg-gray-200 focus:outline-none rounded-lg px-5 py-2 text-xs"
                style={{ minHeight: 40 }}
              ></textarea>
            </div>
            <div className="">
              <Button onClick={handleOnSubmitComment} text="Comment"></Button>
            </div>
          </div>
        )}
        {loadingComment && (
          <div className="flex justify-center items-center">
            <div
              className="animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10 mb-4"
              style={{ borderTopColor: "#3498db" }}
            ></div>
          </div>
        )}
        {loadedComment && comments.length === 0 && (
          <div className="m-3 -mb-3">
            <p className="text-center text-gray-800 text-lg">
              Be the first to comment on this post
            </p>
          </div>
        )}
        {comments.map((item, index) => {
          return (
            <div className="" key={index}>
              <Comment data={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Post;
