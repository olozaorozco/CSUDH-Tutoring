import React from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Chat from "./Chat";
import { useState, useEffect } from "react";
import ChatListComponent from "../components/ChatListComponenet";
import Navbar from "../components/NavBar";

function ChatList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
    setUserId(user.id);
    const fetchData = async () => {
      try {
        const response = await api.post("/chat/list/");
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="body-background" style={{paddingTop:115, paddingBottom: 20}}>
    <Navbar></Navbar>
      <div className="ms-3 mt-1">
        {data.map((chat) => (
          <ChatListComponent Chat={chat} authenticatedUserId={userId} />
        ))}
      </div>
      <Link to="/">
        <button className="btn btn-dark csudh_red ms-2">Back</button>
      </Link>
    </div>
  );
}

export default ChatList;
