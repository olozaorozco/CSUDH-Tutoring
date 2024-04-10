import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import CourseDisplay from "../components/CourseDisplay";

function FormCreation() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const handleClick = () => {};

  const [formData, setFormData] = useState({
    Tutor: 14,
    courses: [],
    description: "",
  });
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
      const response = await fetch("http://localhost:8000/form-creation/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

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
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">Create</button>
      </form>
      <Link to="/">
        <button>Back</button>
      </Link>
    </>
  );
}

export default FormCreation;
