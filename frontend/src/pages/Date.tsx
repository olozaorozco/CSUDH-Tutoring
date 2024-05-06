import React from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import TutorDisplay from "../components/TutorDisplay";

function Date() {
  const { day } = useParams();
  const { date } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

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

  const handleClick = async (id, e) => {
    const response = await api.post("/chat/create/", {
      user1: userId,
      user2: id,
    });
    const chatId = response.data.id;
    localStorage.setItem("chatId", chatId);
    navigate("/chat/view");
  };

  const handleSession = async (form, e) => {
    localStorage.setItem("form", JSON.stringify(form));
    navigate("/test/signup");
  };

  return (
    <>
      <div
        className="body-background"
        style={{ paddingTop: 115, paddingBottom: 20 }}
      >
        <Navbar></Navbar>
        <div className="m-2">
          <h1>Available Tutors</h1>
          {data.map((user) =>
            user.willTutor && user.TutorForm != null && user.TutorForm[day] ? (
              <>
                <div>
                  <TutorDisplay Tutor={user} />
                  <button
                    onClick={(e) => {
                      handleClick(user.id, e);
                    }}
                    className="btn btn-dark csudh_red"
                  >
                    Chat
                  </button>
                  <button
                    className="btn btn-dark csudh_red ms-2"
                    onClick={(e) => {
                      handleSession(user.TutorForm, e);
                    }}
                  >
                    Schedule Session
                  </button>
                </div>
              </>
            ) : null
          )}
        </div>
        <Link to="/calendar">
          <button className="btn btn-dark csudh_red m-2">Back</button>
        </Link>
      </div>
    </>
  );
}

export default Date;
