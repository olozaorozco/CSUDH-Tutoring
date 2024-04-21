import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Message from "../components/Message";
import api from "../api";

function Chat() {
  const handleClick = () => {
    localStorage.removeItem("chatId");
  };
  const handleSubmit = () => {
    api.post("/message/create/", {
      text: newMessage,
      chat: chatId,
      user: userId,
    });
    setMessage("");
    setTimeout(fetchChat, 1000);
  };
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const [chatId, setChatId] = useState("");
  const [newMessage, setMessage] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
    setUserId(user.id);
    setChatId(localStorage.getItem("chatId"));
  }, []);

  const fetchChat = async () => {
    if (chatId) {
      try {
        const response = await api.get(`/chat/${chatId}/`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    }
  };

  useEffect(() => {
    fetchChat();
  }, [chatId]);

  return (
    <>
      <div>
        {data.length > 0 ? (
          data.map((message, index) => (
            <Message
              key={message.id}
              message={message}
              authenticatedUserId={userId}
            />
          ))
        ) : (
          <p></p>
        )}
      </div>
      <Link to="/chat/list">
        <button onClick={handleClick}>Back</button>
      </Link>
      <input
        type="text"
        id="messageCreate"
        placeholder=""
        value={newMessage}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Send</button>
    </>
  );
}

export default Chat;
