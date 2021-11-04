import React, { useRef, useState } from "react";
import server, { getLinkMedia } from "../../services/server";
import Avatar from "../../uis/Avatar";
import Button from "../../uis/Button";
import StatusInput from "../../uis/StatusInput";
import getBase64 from "../../utils/getBase64";
import { useSelector } from "react-redux";
import { userSelect } from "../../reducers/userSlice";

function BoxUpStatus({ reload }) {
  const user = useSelector(userSelect);

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const [imageList, setImageList] = useState([]);

  const handleOnClickUploadStatus = () => {
    setLoading(true);

    const media = imageList.map((item) => item._id);
    const data = {
      content,
      media,
    };

    server(true)
      .post("/post", data)
      .then((result) => {
        console.log(result.data);

        if (!result.data.success) {
          alert(result.data?.message);
        } else {
          setContent("");
          setImageList([]);
          reload();
          console.log(result.data.load);
        }
        setLoading(false);
      });
  };

  const handleOnClickUploadImage = () => {
    inputRef.current.click();
  };

  const handleOnClickDelete = (id) => {
    let cloneList = [...imageList];
    cloneList = cloneList.filter((item) => item._id !== id);
    setImageList(cloneList);
    server(true)
      .delete("/media/remove", {
        data: {
          data: id,
        },
      })
      .then(() => {});
  };

  const handleOnChangeUploadFile = (e) => {
    setLoading(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("photos", e.target.files[i]);
    }

    server(true)
      .post("/media", formData)
      .then(async (result) => {
        if (!result.data.success) {
          alert(result.data?.message);
        } else {
          const cloneList = [...imageList];
          for (let i in result.data.load) {
            let buffer = await getBase64(e.target.files[i]);

            cloneList.push({
              _id: result.data.load[i],
              url: buffer,
            });
          }
          setImageList(cloneList);
        }
        setLoading(false);
        inputRef.current.value = null;
      });
  };

  return (
    <div className="bg-white rounded shadow-md p-5 relative">
      {loading && (
        <div className="rounded-md absolute top-0 left-0 right-0 bottom-0 z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div
            className="animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
            style={{ borderTopColor: "#3498db" }}
          ></div>
          <h2 className="text-center text-white text-xl font-semibold">
            Loading...
          </h2>
        </div>
      )}

      <input
        accept="image/*"
        type="file"
        ref={inputRef}
        multiple
        hidden
        onChange={handleOnChangeUploadFile}
      />
      <div className="flex gap-5">
        <div>
          <Avatar
            _id={user._id}
            name={user.firstName}
            src={getLinkMedia(user.avatar?.meta.filename)}
          />
        </div>
        <div className="flex-1">
          <StatusInput
            firstName={user.firstName}
            content={content}
            setContent={setContent}
          />
        </div>
      </div>
      <div className="flex flex-wrap border-2 border-gray-400 border-dashed p-2 bg-gray-100">
        {imageList.map((item) => {
          return (
            <div className="w-1/5 overflow-hidden p-2" key={item._id}>
              <div
                className="relative w-full bg-center bg-contain border border-gray-300"
                style={{
                  paddingTop: "100%",
                  backgroundImage: "url(" + item.url + ")",
                }}
              >
                <span
                  onClick={() => {
                    handleOnClickDelete(item._id);
                  }}
                  className="select-none absolute top-1 right-1 leading-none rounded-full bg-black bg-opacity-40 text-white w-5 h-5 text-center cursor-pointer hover:bg-opacity-100"
                >
                  ×
                </span>
              </div>
            </div>
          );
        })}
        <div className="w-1/5 overflow-hidden p-2">
          <div
            className="w-full relative bg-gray-200 cursor-pointer hover:bg-gray-400"
            style={{ paddingTop: "100%" }}
            onClick={handleOnClickUploadImage}
          >
            <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-3 pt-3 border-t border-gray-200">
        <Button text="Submit" onClick={handleOnClickUploadStatus} />
      </div>
    </div>
  );
}

export default BoxUpStatus;
