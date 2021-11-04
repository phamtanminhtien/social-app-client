import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelect } from "../../reducers/userSlice";
import server from "../../services/server";
import Title from "../../uis/Title";
import ListUser from "./ListUser";

function FriendList() {
  const user = useSelector(userSelect);

  const [listNoFriend, setListNoFriend] = useState([]);
  const [listFollow, setListFollow] = useState([]);
  const [listRequested, setListRequested] = useState([]);

  const [triggerReload, setTriggerReload] = useState(false);
  const [loading, setLoading] = useState(false);

  //listNoFriend
  const requestFriend = (id) => {
    setLoading(true);
    server(true)
      .post("/friend/request-friend", { receiverId: id })
      .then((result) => {
        if (!result.data.success) {
          alert(result.data.message);
        } else {
          setTriggerReload(!triggerReload);
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);

    server(true)
      .get("/friend/no-friend?limit=10")
      .then((result) => {
        if (!result.data.success) {
          alert(result.data.message);
        } else {
          setListNoFriend(result.data.load);
        }
        setLoading(false);
      });
  }, [user, triggerReload]);

  //listFollow
  const response = (id, response) => {
    server(true)
      .post("/friend/response-friend", { requesterId: id, response: response })
      .then((result) => {
        if (!result.data.success) {
          alert(result.data.message);
        } else {
          setTriggerReload(!triggerReload);
        }
        setLoading(false);
      });
  };
  const deny = (id) => {
    response(id, 0);
  };
  const accept = (id) => {
    response(id, 1);
  };
  useEffect(() => {
    setLoading(true);

    server(true)
      .get("/friend/follow?limit=10")
      .then((result) => {
        if (!result.data.success) {
          alert(result.data.message);
        } else {
          setListFollow(result.data.load);
        }
        setLoading(false);
      });
  }, [user, triggerReload]);

  //listRequested
  const cancelRequest = (id) => {
    setLoading(true);

    server(true)
      .post("/friend/cancel-request-friend", { receiverId: id })
      .then((result) => {
        if (!result.data.success) {
          alert(result.data.message);
        } else {
          setTriggerReload(!triggerReload);
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);

    server(true)
      .get("/friend/request?limit=10")
      .then((result) => {
        if (!result.data.success) {
          alert(result.data.message);
        } else {
          setListRequested(result.data.load);
        }
        setLoading(false);
      });
  }, [user, triggerReload]);
  return (
    <div>
      <Title text="Maybe you know" />
      <ListUser
        loading={loading}
        list={listNoFriend}
        btnAction={requestFriend}
        btnTitle="Request"
      />

      <Title text="Follow you" />
      <ListUser
        loading={loading}
        list={listFollow}
        btnAction={deny}
        btnTitle="Deny"
        extraBtnAction={accept}
        extraBtnTitle="Accept"
      />

      <Title text="Requested" />
      <ListUser
        loading={loading}
        list={listRequested}
        btnAction={cancelRequest}
        btnTitle="Cancel Request"
      />
    </div>
  );
}

export default FriendList;
