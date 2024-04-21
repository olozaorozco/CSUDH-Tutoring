import FormDisplay from "../components/FormDisplay";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Test() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [userFormID, setUserFormID] = useState(null);
  const [userID, setUserID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
    if (user.TutorForm != null) {
      setUserFormID(user.TutorForm.id);
    }
    setUserID(user.id);

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

  const handleClick = async (id, e) => {
    const response = await api.post("/chat/create/", {
      user1: userID,
      user2: id,
    });
    const chatId = response.data.id;
    localStorage.setItem("chatId", chatId);
    navigate("/chat/view");
  };

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
                  .includes(search.toLowerCase()) ||
                form.Tutor.last_name
                  .toLowerCase()
                  .includes(search.toLowerCase())) &&
              form.id != userFormID
            );
          })
          .map((form) => (
            <div>
              <FormDisplay Form={form} />
              <button
                onClick={(e) => {
                  handleClick(form.Tutor.id, e);
                }}
              >
                Chat
              </button>
            </div>
          ))}

      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default Test;
