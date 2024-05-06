import { Fragment, useState } from "react";
import image from "../assets/react.svg";

interface Form {
  Tutor: {
    id: string;
    first_name: string;
    last_name: string;
  };
  courses: {
    id: string;
    CourseNumber: string;
    Title: string;
    Description: string;
  };
  Description: string;
  Mon: boolean;
  Tue: boolean;
  Wed: boolean;
  Thu: boolean;
  Fri: boolean;
  Sat: boolean;
  Sun: boolean;
}

interface Props {
  Form: Form;
}

const FormDisplay = ({ Form }: Props) => {
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
      className="card mb-3 csudh_yellow border border-dark"
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="row g-0">
        <div className="col-md-4">
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              {Form.Tutor.first_name} {Form.Tutor.last_name}
            </h5>
            <p className="card-text">
              <ul>
                {Form.courses.map((course) => (
                  <li>{course.Title}</li>
                ))}
              </ul>
            </p>
            <p className="card-text">
              <small className="text-body-secondary">{Form.Description}</small>
            </p>
            <div>
            Days Available:
            <ul>
              {Form.Mon ? <li>Monday</li> : null}
              {Form.Tue ? <li>Tuesday</li> : null}
              {Form.Wed ? <li>Wednesday</li> : null}
              {Form.Thu ? <li>Thursday</li> : null}
              {Form.Fri ? <li>Friday</li> : null}
              {Form.Sat ? <li>Saturday</li> : null}
              {Form.Sun ? <li>Sunday</li> : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDisplay;
