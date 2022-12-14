import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainImage from "../LandingPage/Sections/MainImage";
import axios from "axios";
import { useSelector } from "react-redux";

function UpdateDetailPage() {
  const lists = useSelector((state) => state.list.list);
  const [list, setlist] = useState([]);

  let listid = useParams().listid;

  useEffect(() => {
    const targetlist = lists.find((list) => list.id == listid);
    setlist(targetlist);

    console.log(
      "🚀 ~ file: UpdateDetailPage.js:10 ~ UpdateDetailPage ~ list",
      lists
    );

    settitle(list.title);
    setdescription(list.description);
    setimage(list.image);
  }, []);

  const [title, settitle] = useState(list.title);
  const [description, setdescription] = useState(list.description);
  const [image, setimage] = useState(list.image);

  const listUpdateHandler = () => {
    const endPoint = `http://localhost:7777/api/lists/${listid}`; // find all
    const data = { title: title, description: description, image: image };
    axios
      .put(endPoint, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
      }}
    >
      <MainImage item={list} />
      title : <input type="text" value={title} />
      description : <input type="text" value={description} />
      image : <input type="text" value={image} />
      <button onClick={listUpdateHandler}>수정하기</button>
    </div>
  );
}

export default UpdateDetailPage;
