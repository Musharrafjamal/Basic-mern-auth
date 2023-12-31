import React, { useState } from "react";
import axios from "axios";

const UploadImg = () => {
  const [file, setFile] = useState({ file: "" });
  const [imageSrc, setImageSrc] = useState(null);

  const handleUpload = async () => {
    try {
      await axios.post("http://localhost:5000/auth/upload", file);

      console.log("file going to backend successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFile({ file: base64 });
    setImageSrc(base64)
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpload();
        }}
      >
        <input type="file" onChange={handleFileUpload} name="file" />
        <button type="submit">Upload</button>
      </form>
      {imageSrc && <img src={imageSrc} alt="Preview" style={{ marginTop: '20px', maxWidth: '100%' }} />}
    </>
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
