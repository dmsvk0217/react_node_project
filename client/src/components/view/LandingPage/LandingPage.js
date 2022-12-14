import React, { useEffect, useState } from "react";
import axios from "axios";
import MainImage from "./Sections/MainImage";
import GridCard from "../common/GridCard";
import { useDispatch } from "react-redux";
import { getList } from "../../../_actions/list_action";

function LandingPage() {
  const dispatch = useDispatch();

  const [lists, setlists] = useState([]);
  const [MainListImage, setMainListImage] = useState("");

  useEffect(() => {
    dispatch(getList())
      .then((response) => {
        setlists(response.payload);
        setMainListImage(response.payload[0]);
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  }, []);

  return (
    <div style={{ width: "100%", margin: 0 }}>
      {/*main image*/}
      {MainImage && <MainImage item={MainListImage} />}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>List by lastest</h2>
        <hr />
        {/* list Grid Cards */}
        <div
          style={{
            display: "flex",
            alignContent: "center",
            flexFlow: "row wrap",
            justifyContent: "space-evenly",
            alignContent: "space-around",
          }}
        >
          {lists &&
            lists.map((list, index) => (
              <React.Fragment key={index}>
                <GridCard item={list} />
              </React.Fragment>
            ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>Load More</button>
      </div>
    </div>
  );
}

export default LandingPage;

//INSERT INTO lists (title, description, published, image) VALUES ('this is title3', 'this is description3', 'published3', 'https://i.scdn.co/image/ab6761610000e5eb5f8e232c7c529734eab28b66');
