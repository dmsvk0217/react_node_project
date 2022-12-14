import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainImage from "../LandingPage/Sections/MainImage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ListDetailPage() {
  const navigate = useNavigate();
  const lists = useSelector((state) => state.list.list);
  const [list, setlist] = useState([]);

  let listid = useParams().listid;

  useEffect(() => {
    const targetlist = lists.find((list) => list.id == listid);
    setlist(targetlist);
  }, []);

  // delete list
  const listDeleteHandler = (e) => {
    const endPoint = `http://localhost:7777/api/lists/${listid}`;
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
    navigate(`/list/update/${listid}`, { replace: false });
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
