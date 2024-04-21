import React, { useState, Fragment } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Login = () => {
  const navigate = useNavigate();
  localStorage.clear();

  const getUser = async () => {
    const userData = await api.get("/user/");
    return userData;
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/token/", formData);
      // Save token to localStorage and redirect

      console.log("it worked");
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

      const userData = await getUser();
      localStorage.setItem("user", JSON.stringify(userData.data));
      const localUser = localStorage.getItem("user");
      const user = JSON.parse(localUser);
      if (user.willTutor == false || user.TutorForm != null) {
        navigate("/");
      } else {
        navigate("/form");
      }
      // Redirect or update authentication state
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/">
        <button>Back</button>
      </Link>
    </>
  );
};

export default Login;