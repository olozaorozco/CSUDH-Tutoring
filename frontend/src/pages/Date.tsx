import React from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";

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
      <div className="body-background" style={{paddingTop:115, paddingBottom: 20}}>
        <Navbar></Navbar>
        <div className="m-2">
          <h1>Available Tutors</h1>
          {data.map((user) => (user.willTutor && user.TutorForm != null && user.TutorForm[day]) ? 
          (
            <>
              <div>
              <h2>{user.first_name} {user.last_name}</h2>
              <h3>{user.email}</h3>
              </div>
            </>
          ) : null)}
        </div>
        <Link to="/calendar">
          <button className="btn btn-dark csudh_red m-2">Back</button>
        </Link>
        </div>
        
    </>
  );
}

export default Date;
