import React, { useEffect, useState } from "react";
import Post from "../../components/Post";
import server from "../../services/server";

function ListPost({ reload }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    server(true)
      .get("/post/relate")
      .then((result) => {
        if (!result.data.success) {
          alert(result.data?.message);
        } else {
          setPosts(result.data.load);
        }
      });
  }, [setPosts, reload]);
  return (
    <div>
      {posts.map((post) => {
        return <Post data={post} key={post._id} />;
      })}
    </div>
  );
}

export default ListPost;
