import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import Navbar from "../components/NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ScheduleSession() {
  const [tutoringFormId, setTutoringFormId] = useState("");
  const [tutoringDate, setTutoringDate] = useState("");
  const [location, setLocation] = useState("");
  const [formId, setFormID] = useState("");
  const [userId, setUserID] = useState("");
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);

  useEffect(() => {
    const formData = localStorage.getItem("form");
    const form = JSON.parse(formData);
    setFormID(form.id);

    setLocations([]);
    if (form.Zoom) {
      setLocations((prevItems) => [...prevItems, "Zoom"]);
    }
    if (form.Messaging) {
      setLocations((prevItems) => [...prevItems, "Messaging"]);
    }
    if (form.OnCampus) {
      setLocations((prevItems) => [...prevItems, "On Campus"]);
    }

    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
    setUserID(user.id);

    const days = [];
    if (form.Mon) {
      days.push(1);
    }
    if (form.Tue) {
      days.push(2);
    }
    if (form.Wed) {
      days.push(3);
    }
    if (form.Thu) {
      days.push(4);
    }
    if (form.Fri) {
      days.push(5);
    }
    if (form.Sat) {
      days.push(6);
    }
    if (form.Sun) {
      days.push(10);
    }
    setAvailableDays(days);
  }, []);

  function formatDate(date) {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let locationID;
    if (location == "Zoom") {
      locationID = 3;
    }
    if (location == "On Campus") {
      locationID = 1;
    }
    if (location == "Messaging") {
      locationID = 2;
    }

    if (locationID == null) {
      alert("Please select a location.");
      return;
    }

    const formattedDate = formatDate(tutoringDate);

    try {
      const response = await api.post("/session/", {
        TutoringForm: formId,
        Student: userId,
        Tutoring_Date: formattedDate,
        Location: locationID,
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
          <DatePicker
            selected={tutoringDate}
            onChange={(date) => setTutoringDate(date)}
            filterDate={(date) => availableDays.includes(date.getDay())}
            className="form-control"
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="form-group col-md-3 mt- ms-2">
          <label>Location:</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-control"
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option value={loc}>{loc}</option>
            ))}
          </select>
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
