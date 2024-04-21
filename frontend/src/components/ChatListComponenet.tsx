import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Chat {
  id: string;
  user1: {
    id: string;
    first_name: string;
    last_name: string;
  };
  user2: {
    id: string;
    first_name: string;
    last_name: string;
  };
}

interface Props {
  Chat: Chat;
  authenticatedUserId: string;
}

const handleClick = (id) => {
  const navigate = useNavigate();
  localStorage.setItem("chatId", id);
  navigate("/chat/view");
};

const ChatListComponent = ({ Chat, authenticatedUserId }: Props) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    localStorage.setItem("chatId", id);
    navigate("/chat/view");
  };

  let titleName = "";
  if (authenticatedUserId === Chat.user1.id) {
    titleName = Chat.user2.first_name;
  } else {
    titleName = Chat.user1.first_name;
  }
  const cardStyle = {
    maxWidth: "18rem",
  };

  return (
    <div className="card text-bg-primary mb-3" style={cardStyle}>
      <div className="card-header">{titleName}</div>
      <div className="card-body">
        <p className="card-text">Nothing for Now!!!</p>
      </div>
      <button
        onClick={(e) => {
          handleClick(Chat.id, e);
        }}
      >
        select
      </button>
    </div>
  );
};

export default ChatListComponent;
