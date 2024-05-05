import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Message from "../components/Message";
import api from "../api";
import Navbar from "../components/NavBar";

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

  const inputStyle = {
    maxWidth: "fit-content",
    position: "absolute",
    bottom: 10,
    marginLeft: 550,
    maxHeight: 100
  } as React.CSSProperties;

  return (
    <div className="body-background" style={{paddingTop:115, paddingBottom: 20}}>
      <Navbar></Navbar>
      <div style={{margin: 10}}>
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

      <Link to="/chat/list" style={{position:"absolute", bottom:0, margin:10}}>
        <button onClick={handleClick} className="btn btn-dark csudh_red">Back</button>
      </Link>
      <div style={inputStyle}>
        <input
          type="text"
          id="messageCreate"
          placeholder=""
          value={newMessage}
          onChange={(e) => setMessage(e.target.value)}
          style={{height:32, borderRadius:10, textAlign:"center"}}
        />
        <button onClick={handleSubmit} className="btn btn-dark csudh_red ms-2">Send</button>
      </div>
      
    </div>
  );
}

export default Chat;
