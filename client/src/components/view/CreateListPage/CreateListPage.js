import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Radio, Space, Divider } from "antd";
import "./CreateListPage.css";
import { rejectStyle, acceptStyle, focusedStyle, baseStyle } from "./dropzone";

function CreateListPage() {
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
          <input id="title" type="text" />
        </div>

        <div className="input">
          <label htmlFor="description">description</label>
          <br />
          <textarea
            name="description"
            id="description"
            cols="50"
            rows="7"
          ></textarea>
        </div>
        <br />
        <div className="input">
          <label htmlFor="state">Choose a state:</label>
          <select name="state" id="state">
            <option value="private">private</option>
            <option value="public">public</option>
            <option value="don't care">don't care</option>
          </select>
        </div>
      </div>

      <button>submit</button>
      <footer>happy coding</footer>
    </div>
  );
}

export default CreateListPage;
