import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState({ profilePic: "" });
  const [imageSrc, setImageSrc] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log({username, password, profilePic})
    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        password,
        profilePic,
      });
      console.log("user saved");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err.message);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setProfilePic(base64);
    setImageSrc(base64);
  };

  return (
    <div>
      <h2>Register</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="file" onChange={handleFileUpload} name="profilePic" />
        <button type="submit">Register</button>
      </form>
      {/* {imageSrc && (
        <img
          src={imageSrc}
          alt="Preview"
          style={{ marginTop: "20px", maxWidth: "100%" }}
        />
      )} */}
    </div>
  );
};

export default Register;

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
