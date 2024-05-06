import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import Navbar from "../components/NavBar";

function ScheduleSession() {
  const [tutoringFormId, setTutoringFormId] = useState("");
  const [tutoringDate, setTutoringDate] = useState("");
  const [location, setLocation] = useState("");
  const [formId, setFormID] = useState("")
  const [userId, setUserID] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const formData = localStorage.getItem("form");
    const form = JSON.parse(formData);
    setFormID(form.id);
    
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
    setUserID(user.id);
},[]);
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/tutoringsessions", {
        TutoringForm: formId,
        Student: userId,
        Tutoring_Date: tutoringDate,
        Location: location,
      });
      alert("Session scheduled successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to schedule session:", error);
      alert("Failed to schedule session. Please try again.");
    }
  };

  return (
    <div
      className="body-background"
      style={{ paddingTop: 115, paddingBottom: 20 }}
    >
      <Navbar></Navbar>
      <form onSubmit={handleSubmit}>
        <div className="form-group col-md-3 mt- ms-2">
          <label htmlFor="date">Tutoring Date:</label>
          <input
            type="date"
            id="date"
            value={tutoringDate}
            onChange={(e) => setTutoringDate(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group col-md-3 mt- ms-2">
          <label>Location:</label>
          <input
            type="number"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-dark csudh_red ms-2 mt-2">
          Schedule Session
        </button>
      </form>
      <Link to="/test">
        <button
          className="mb-3 btn btn-dark csudh_red"
          onClick={() => {
            localStorage.removeItem("form");
          }}
        >
          Back
        </button>
      </Link>
    </div>
  );
}

export default ScheduleSession;
