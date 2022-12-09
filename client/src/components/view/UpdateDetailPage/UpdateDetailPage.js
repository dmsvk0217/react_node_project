import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainImage from "../LandingPage/Sections/MainImage";
import axios from "axios";

function UpdateDetailPage() {
  let listid = useParams().listid;

  useEffect(() => {
    //useParams을 이용하여 id값 받아오기.
    console.log("listid ", listid);

    const endPoint = `http://localhost:7777/api/lists/${listid}`; // find all

    axios
      .get(endPoint)
      .then((res) => {
        console.log(res.data); // 변경된 데이터
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  }, []);

  const [list, setlist] = useState([]);
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
        setlist(res.data);
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
