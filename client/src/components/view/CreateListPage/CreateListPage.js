import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import "./CreateListPage.css";
import { rejectStyle, acceptStyle, focusedStyle, baseStyle } from "./dropzone";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateListPage() {
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [privateOption, setprivateOption] = useState(0);
  const [image, setimage] = useState("");

  const titleHandler = (e) => {
    settitle(e.target.value);
  };

  const imageHandler = (e) => {
    setimage(e.target.value);
  };

  const descriptionHandler = (e) => {
    setdescription(e.target.value);
  };

  const privateOptionHandler = (e) => {
    setprivateOption(e.target.value);
  };

  const createlistHandler = () => {
    const list = {
      title: title,
      description: description,
      published: privateOption,
      image: image,
    };
    axios
      .post("/api/lists/", list, { withCredentials: true })
      .then((response) => {
        console.log(response);
        navigate("/", { replace: true });
      });
  };

  const privateOptionItem = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" },
  ];

  const onDropHandler = (files) => {
    console.log(files);
  };

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: { "image/*": [] }, onDrop: onDropHandler });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="createPage">
      <header>Create List</header>
      <div className="form">
        <section className="container">
          <div {...getRootProps({ style, className: "dropzone" })}>
            <input {...getInputProps()} />
            <PlusOutlined style={{ fontSize: "70px" }} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <aside>
            <h4>입력된 파일</h4>
            <ul>{files}</ul>
          </aside>
        </section>

        <div className="input">
          <label htmlFor="title">title</label>
          <br />
          <input id="title" onChange={titleHandler} value={title} type="text" />
        </div>

        <div className="input">
          <label htmlFor="image">image</label>
          <br />
          <input
            style={{ width: "100%" }}
            id="image"
            onChange={imageHandler}
            value={image}
            type="text"
          />
        </div>

        <div className="input">
          <label htmlFor="description">description</label>
          <br />
          <textarea
            value={description}
            onChange={descriptionHandler}
            name="description"
            id="description"
            cols="50"
            rows="7"
          ></textarea>
        </div>
        <br />
        <div className="input">
          <label htmlFor="state">Choose a state:</label>
          <select
            name="state"
            id="state"
            value={privateOption}
            onChange={privateOptionHandler}
          >
            {privateOptionItem.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={createlistHandler}>submit</button>
      <footer>happy coding</footer>
    </div>
  );
}

export default CreateListPage;
