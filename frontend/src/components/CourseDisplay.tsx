import { Fragment, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

interface Course {
  Title: string;
  CourseNumber: string;
  Description: string;
}

interface Props {
  Course: Course;
}

const FormDisplay = ({ Course }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const cardStyle = {
    maxWidth: "540px",
    backgroundColor: isHovered ? "#f0f0f0" : "transparent", // Change background color on hover
    transition: "background-color 0.3s ease", // Add smooth transition
    position: "static"
    } as React.CSSProperties;

  return (
    <div
      className="card csudh_yellow border border-dark"
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-body">
        <h5 className="card-title">{Course.CourseNumber}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          {Course.Title}
        </h6>
        <p className="card-text">{Course.Description}</p>
      </div>
    </div>
  );
};

export default FormDisplay;
