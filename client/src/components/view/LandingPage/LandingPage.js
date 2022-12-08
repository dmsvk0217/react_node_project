import React, { useEffect, useState } from "react";
import axios from "axios";
import MainImage from "./Sections/MainImage";

function LandingPage() {
  const [lists, setlists] = useState([]);
  const [MainListImage, setMainListImage] = useState("");

  useEffect(() => {
    const endPoint = "http://localhost:7777/api/lists/"; // find all

    axios
      .get(endPoint)
      .then((res) => {
        //res.data로 lists가 넘어옴.
        console.log(res.data);
        setlists(res.data);
        setMainListImage(res.data[0]);
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  }, []);

  return (
    <div style={{ width: "100%", margin: 0 }}>
      {/*main image*/}
      {MainImage && <MainImage list={MainListImage} />}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>List by lastest</h2>
        <hr />

        {/* list Grid Cards */}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>Load More</button>
      </div>
    </div>
  );
}

export default LandingPage;
