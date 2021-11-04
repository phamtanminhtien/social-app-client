import React from "react";
import UserBoxNF from "../../components/UserBoxNF";

function ListUser({
  list,
  btnAction,
  btnTitle,
  extraBtnAction,
  extraBtnTitle,
  loading,
}) {
  return (
    <div className="relative overflow-hidden rounded-md">
      {loading && (
        <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-black opacity-40">
          <div
            className="animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10"
            style={{ borderTopColor: "#3498db" }}
          ></div>
        </div>
      )}
      {list.map((item) => {
        return (
          <div key={item._id}>
            <UserBoxNF
              user={item}
              btnAction={btnAction}
              btnTitle={btnTitle}
              extraBtnAction={extraBtnAction}
              extraBtnTitle={extraBtnTitle}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ListUser;
