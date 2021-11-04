import React, { useEffect, useState } from "react";
import Post from "../../components/Post";
import server from "../../services/server";

function ListPost({ id, reload }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    server(true)
      .get("/post/user/" + id)
      .then((result) => {
        if (!result.data.success) {
          alert(result.data?.message);
        } else {
          setPosts(result.data.load);
        }
      });
  }, [setPosts, reload, id]);
  return (
    <div>
      {posts.map((post, index) => {
        return <Post data={post} key={post._id} />;
      })}
    </div>
  );
}

export default ListPost;
