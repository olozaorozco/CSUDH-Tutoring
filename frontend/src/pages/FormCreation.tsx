import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import CourseDisplay from "../components/CourseDisplay";
import api from "../api";
import Navbar from "../components/NavBar";

function FormCreation() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = () => {};

  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
    setUserID(user.id);
    axios
      .get("http://localhost:8000/api/courses/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      });
  }, []);

  const [formData, setFormData] = useState({
    Tutor: userID,
    courses: [],
    Description: "",
  });

  useEffect(() => {
    if (userID != null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Tutor: userID,
      }));
    }
  }, [userID]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (e, courseId) => {
    const checked = e.target.checked;
    if (checked) {
      setFormData({
        ...formData,
        courses: [...formData.courses, courseId],
      });
    } else {
      // If checkbox is unchecked, remove the course from the formData
      setFormData({
        ...formData,
        courses: formData.courses.filter((id) => id !== courseId),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await api.post("/form/creation/", formData);
      console.log("Form Submitting");
      if (response.status >= 400) {
        throw new Error("Form Creation failed");
      }

      // Registration successful
      console.log("Form created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error registering user:", error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="body-background" style={{paddingTop:115, paddingBottom: 20}}>
      <Navbar></Navbar>
      <h2 className="mt-2 ms-2">What Courses Can You Tutor?</h2>
      <h3 className="mt-2 ms-2">Select courses by flipping the switches underneath. Then add a description for your post</h3>
      <div className="ms-2">
        <div className="mb-3">
          <input
            type="text"
            id="searchInput"
            placeholder="Enter your search term"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="me-1"
            style={{ height: 32, borderRadius: 10, textAlign: "center" }}
          />
          <button
            onClick={() => {
              handleClick;
            }}
            className="btn btn-sm btn-dark csudh_red"
          >
            Search
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {data.length > 0 &&
            data
              .filter((course) => {
                return (
                  course.CourseNumber.toLowerCase().includes(
                    search.toLowerCase()
                  ) || course.Title.toLowerCase().includes(search.toLowerCase())
                );
              })
              .map((course) => (
                <div>
                  <CourseDisplay Course={course} />
                  <div className="form-check form-switch mt-1 mb-2">
                    <input
                      type="checkbox"
                      name="addCourse"
                      checked={formData.courses.includes(course.id)}
                      onChange={(e) => handleCheck(e, course.id)}
                      className="form-check-input"
                    //placeholder="Username"
                    />
                  </div>
                  
                </div>
              ))}
          <div className="mb-3">
            <input
              type="text"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              placeholder="Description"
              className="me-1"
              style={{ height: 32, borderRadius: 10, textAlign: "center" }}
            />
            <button type="submit" className="btn btn-sm btn-dark csudh_red">Create</button>
          </div>

        </form>
        <Link to="/">
          <button className="btn btn-dark csudh_red">Back</button>
        </Link>
        <ul>
          {formData.courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </div>
    </div>
    
      
  );
}

export default FormCreation;