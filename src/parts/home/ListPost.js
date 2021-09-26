import React, { useEffect, useState } from "react";
import Post from "../../components/Post";
import server from "../../services/server";

function ListPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    server(true)
      .get("/post/relate")
      .then((result) => {
        if (!result.data.success) {
          alert(result.data?.message);
        } else {
          console.log(result.data.load);
          setPosts(result.data.load);
        }
      });
  }, [setPosts]);
  return (
    <div>
      {posts.map((post, index) => {
        return <Post data={post} key={index} />;
      })}
    </div>
  );
}

export default ListPost;
