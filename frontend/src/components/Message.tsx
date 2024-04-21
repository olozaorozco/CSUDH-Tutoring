import { Fragment, useState } from "react";

interface ChatMessage {
  text: string;
  time: string;
  user?: {
    id: string;
    first_name: string;
    last_name: string;
  };
}

interface Props {
  Message: ChatMessage;
  authenticatedUserId: string;
}

const Message = ({ message, authenticatedUserId }: Props) => {
  let rightSide = false;
  if (authenticatedUserId === message.user.id) {
    rightSide = true;
  }
  const cardStyle = {
    backgroundColor: rightSide ? "text-bg-primary" : "text-bg-secondary",
    side: rightSide ? "float-right" : "float-left",
    maxWidth: "18rem",
  };
  return (
    <div
      className={`d-flex ${
        rightSide ? "justify-content-end" : "justify-content-start"
      } w-100`}
    >
      <div
        className={`card ${cardStyle.backgroundColor} mb-3`}
        style={cardStyle}
      >
        <div className="card-header">{message.time}</div>
        <div className="card-body">
          <p className="card-text">{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
