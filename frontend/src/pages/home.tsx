import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";

function Home() {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
    setFirstName(user.first_name);
  });
  return (
    <div className="body-background" style={{paddingTop:115}}>
      <Navbar></Navbar>
      <div>
        <h1>Link to search</h1>
        <Link to="/test">
          <button>To test site</button>
        </Link>
        <h3>Form</h3>
        <Link to="/Form">
          <button>Form</button>
        </Link>
        <h1>Link to Chat Test</h1>
        <Link to="/chat/list">
          <button>To chat site</button>
        </Link>
        <h2>Link to Calendar</h2>
        <Link to="/calendar">
          <button>To calendar site</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
