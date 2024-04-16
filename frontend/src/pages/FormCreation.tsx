import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import CourseDisplay from "../components/CourseDisplay";
import api from "../api";
import { useUser } from "../components/UserContext";

function FormCreation() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const handleClick = () => {};

  const { user} = useUser();

  //const history = useHistory();
  useEffect(() => {
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
  console.log(user);

  const [formData, setFormData] = useState({
    Tutor: user ? user.id : null,
    courses: [],
    Description: "",
  });

  if (!user) {
    return <div>Loading...</div>;
    // Display a loading state while waiting for user data
  }

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
    try {
      const response = await api.post("/form/creation/", formData);

      if (!response.ok) {
        throw new Error("Form Creation failed");
      }

      // Registration successful
      console.log("Form created successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          id="searchInput"
          placeholder="Enter your search term"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            handleClick;
          }}
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
                <input
                  type="checkbox"
                  name="addCourse"
                  checked={formData.courses.includes(course.id)}
                  onChange={(e) => handleCheck(e, course.id)}
                  //placeholder="Username"
                />
              </div>
            ))}
        <input
          type="text"
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">Create</button>
      </form>
      <Link to="/">
        <button>Back</button>
      </Link>
      <ul>
        {formData.courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </>
  );
}

export default FormCreation;
