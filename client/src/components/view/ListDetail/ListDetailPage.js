import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainImage from "../LandingPage/Sections/MainImage";
import { useNavigate } from "react-router-dom";

function ListDetailPage() {
  const navigate = useNavigate();
  const [list, setlist] = useState([]);

  let listid = useParams().listid;

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

  const listDeleteHandler = (e) => {
    const endPoint = `http://localhost:7777/api/lists/${listid}`; // delete list

    axios
      .delete(endPoint)
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message === "list was deleted successfully!") {
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  };

  const listUpdateHandler = () => {
    navigate(`/updateList/${listid}`, { replace: false });
  };

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
        <div>
          <button onClick={listUpdateHandler}>수정하기</button>
          <button onClick={listDeleteHandler}>삭제하기</button>
        </div>
      </div>
    </div>
  );
}

export default ListDetailPage;
