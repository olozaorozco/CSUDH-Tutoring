import FormDisplay from "../components/FormDisplay";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Test() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tutoringforms/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      });
  }, []);

  const handleClick = () => {};

  return (
    <div>
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
      {data.length > 0 &&
        data
          .filter((form) => {
            return (
              form.Tutor.willTutor &&
              (form.courses.some(
                (course) =>
                  course.CourseNumber.toLowerCase().includes(
                    search.toLowerCase()
                  ) || course.Title.toLowerCase().includes(search.toLowerCase())
              ) ||
                form.Tutor.first_name
                  .toLowerCase()
                  .includes(search.toLowerCase()))
            );
          })
          .map((form) => (
            <div>
              <FormDisplay Form={form} />
            </div>
          ))}

      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default Test;
