const timeForPost = (time) => {
  const timeGeneral = new Date(time);
  return timeGeneral.toLocaleString();
};

export default timeForPost;
