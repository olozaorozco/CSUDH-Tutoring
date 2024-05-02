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
    <>
    <Navbar></Navbar>
      <div>
        {data.map((chat) => (
          <ChatListComponent Chat={chat} authenticatedUserId={userId} />
        ))}
      </div>
      <Link to="/">
        <button>Back</button>
      </Link>
    </>
  );
}

export default ChatList;
