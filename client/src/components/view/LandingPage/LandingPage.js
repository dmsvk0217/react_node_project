import React, { useEffect, useState } from "react";
import axios from "axios";
import MainImage from "./Sections/MainImage";
import GridCard from "../common/GridCard";

function LandingPage() {
  const [lists, setlists] = useState([]);
  const [MainListImage, setMainListImage] = useState("");

  useEffect(() => {
    const endPoint = "/api/lists/"; // find all

    axios
      .get(endPoint)
      .then((res) => {
        //res.data로 lists가 넘어옴.
        //console.log(res.data);
        setlists(res.data);
        setMainListImage(res.data[0]);
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  }, []);

  useEffect(() => {
    const endPoint = "/api/user/auth"; // find all

    axios
      .post(endPoint)
      .then((res) => {
        //res.data로 user정보가 넘어옴.
        console.log("res : ", res);
        console.log("res.data : ", res.data);
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
