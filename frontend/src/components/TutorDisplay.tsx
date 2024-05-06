import { Fragment, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

interface Tutor {
  first_name: string;
  last_name: string;
  email: string;
  Description: string;
  TutorForm: {
  courses: {
    id: string;
    CourseNumber: string;
    Title: string;
    Description: string;
  }};
}

interface Props {
  Tutor: Tutor;
}

const TutorDisplay = ({ Tutor }: Props) => {
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
        <h5 className="card-title">{Tutor.first_name} {Tutor.last_name}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          {Tutor.email}
        </h6>
        <p className="card-text">{Tutor.Description}</p>
        <p className="card-text">
              <ul>
                {Tutor.TutorForm.courses.map((course) => (

                  <li>{course.CourseNumber} - {course.Title}</li>
                ))}
              </ul>
            </p>
      </div>
    </div>
  );
};

export default TutorDisplay;
