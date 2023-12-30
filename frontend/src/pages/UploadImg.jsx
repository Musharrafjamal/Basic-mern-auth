import React, { useState } from "react";
import axios from "axios";

const UploadImg = () => {
  //   const [fileData, setFileData] = useState({ file: "" });
  const [file, setFile] = useState({file: ""});

  const handleUpload = async () => {
    try {
      

      await axios.post("http://localhost:5000/auth/uploads", file);

      console.log("file going to backend successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    // setFileData({ file: base64 });
    setFile({file: base64});
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleUpload();
      }}
    >
      <input type="file" onChange={handleFileUpload} name="file" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadImg;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
