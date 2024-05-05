import FormDisplay from "../components/FormDisplay";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import Navbar from "../components/NavBar";

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
    
    <div className="body-background">
      <Navbar></Navbar>
      <h2 className="mt-2 ms-2" style={{paddingTop:130}}>Search For Tutors Below!</h2>
      <h3 className="mt-2 ms-2">Search By Tutor Name Or Course Name</h3>
      <div className="ms-2">
        <div className="mb-3">
          <input
            type="text"
            id="searchInput"
            placeholder="Enter your search term"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="me-1"
            style={{height:32, borderRadius:10, textAlign:"center"}}
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
              <div className="mb-3">
                <FormDisplay Form={form} />
                <button
                  onClick={(e) => {
                    handleClick(form.Tutor.id, e);
                  }}
                  className="btn btn-dark cs udh_red"
                >
                  Chat
                </button>
              </div>
            ))}

        <Link to="/">
          <button className="mb-3 btn btn-dark csudh_red">Back</button>
        </Link>
      </div>
      </div>
      
  );
}

export default Test;
