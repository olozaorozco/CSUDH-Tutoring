import { useState, Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import axios from "axios";
import NavbarLogin from "../components/NavBarLogin";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    willTutor: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/register/", formData);

      if (response.status >= 400) {
        throw new Error("Registration failed");
      }

      // Registration successful
      console.log("User registered successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <>
      <NavbarLogin registering={"Login"}></NavbarLogin>
      <form onSubmit={handleSubmit} style={{marginLeft: 10, marginRight:10}}>
        <div className="form-group col-md-5">
          <label htmlFor="User Name">Username</label>
          <input
            type="text"
            name="username"
            id="User Name"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="form-control"
          />
        </div>
        
        <div className="form-group col-md-5">
          <label htmlFor="First Name">First Name</label>
          <input
            type="text"
            name="first_name"
            id="First Name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="form-control"
          />
        </div>

        <div className="form-group col-md-5">
          <label htmlFor="Last Name">Last Name</label>
          <input
            type="text"
            name="last_name"
            id="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="form-control"
          />
        </div>

        
        <div className="form-group col-md-5">
          <label htmlFor="Email">Email Address</label>
          <input
            type="email"
            name="email"
            id="Email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-control"
          />
        </div>
        <div className="form-group col-md-5">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            name="password"
            id="Password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="form-control"
          />
        </div>
        
        <p>
          Will you be tutoring? &nbsp;
          <input
            type="checkbox"
            name="willTutor"
            checked={formData.willTutor}
            onChange={handleCheck}
            placeholder="Will you Tutor?"
          />
        </p>
      </form>
      <Link to="/">
        <button>Back</button>
      </Link>
    </>
  );
}

export default Register;
