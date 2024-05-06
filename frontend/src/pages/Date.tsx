import React from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import TutorDisplay from "../components/TutorDisplay";

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
              <div className="mb-3">
                <TutorDisplay Tutor={user}/>
              </div>
            </>
          ) : null)}
        </div>
        <Link to="/calendar" style={{position:"fixed", bottom:0, margin:10}}>
          <button className="btn btn-dark csudh_red m-2">Back</button>
        </Link>
        </div>
        
    </>
  );
}

export default Date;
