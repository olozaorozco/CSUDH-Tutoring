import React from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Date() {
  const { day } = useParams();
  const { date } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  
    useEffect(() => {
      const userData = localStorage.getItem("user");
      const user = JSON.parse(userData);
      setUserId(user.id);
      const fetchData = async () => {
        try {
          const response = await api.get("/api/users/");
          setData(response.data);
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, []);
  return (
    <>
      <div>
        <h1>Available Tutors</h1>
        {data.map((user) => {
          if (user.willTutor == true /** && user.TutorForm.availability.includes(day) /**/) {
            return (
              <>
                <h2>{user.username} {user.last_name}</h2>
                <h3>{user.email}</h3>
              </>
          );}})}
      </div>
      <Link to="/calendar">
        <button>Back</button>
      </Link>
    </>
  );
}

export default Date;
