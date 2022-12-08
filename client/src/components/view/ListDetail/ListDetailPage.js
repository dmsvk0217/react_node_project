import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainImage from "../LandingPage/Sections/MainImage";

function ListDetailPage() {
  let listid = useParams().listid;

  const [list, setlist] = useState([]);

  useEffect(() => {
    //useParams을 이용하여 id값 받아오기.
    console.log("listid ", listid);

    const endPoint = `http://localhost:7777/api/lists/${listid}`; // find all

    axios
      .get(endPoint)
      .then((res) => {
        console.log(res.data);
        setlist(res.data);
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  }, []);

  return (
    <div>
      <MainImage item={list} />
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
        }}
      >
        <h2>{list.title}</h2>
        <h2>{list.description}</h2>
        <img src={list.image} alt={list.title} />
      </div>
    </div>
  );
}

export default ListDetailPage;
