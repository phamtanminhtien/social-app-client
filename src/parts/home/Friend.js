import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelect } from "../../reducers/userSlice";
import server from "../../services/server";
import UserBox from "../../components/UserBox";

function Friend() {
  const user = useSelector(userSelect);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    server(true)
      .get("/friend/all-friend?limit=6")
      .then((result) => {
        if (!result.data.success) {
          alert(result.data.message);
        } else {
          setFriends(result.data.load);
        }
      });
  }, [user]);

  return (
    <div>
      {friends.length === 0 ? (
        <div className="m-3 -mb-3">
          <p className="text-center text-gray-800 text-lg">
            You have no friend
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap -mx-1">
          {friends.map((item, index) => {
            return (
              <div key={index} className="w-1/3 px-1 mb-2">
                <UserBox user={item} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Friend;
