import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";

function Home() {
  const [firstName, setFirstName] = useState("");

  var isTutor = false;
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
    setFirstName(user.first_name);

    isTutor = user.isTutor == 1;
    

  });

  
  
  
  return (
    <div className="body-background" style={{paddingTop:115}}>
      <Navbar></Navbar>
      <div className="m-2">
        <h1 className="d-flex justify-content-center">Welcome! Search for a student tutor or offer your tutoring services below.</h1>
        

        <h3>Click to See Available Tutors</h3>
        <Link to="/test">
          <button className="btn btn-dark csudh_red">Tutor Search</button>
        </Link>

        {isTutor ? <div>
          <h3>Click to Create a Tutoring Post</h3>
          <Link to="/Form">
            <button className="btn btn-dark csudh_red">Create Post</button>
          </Link>
        </div>
        : <div></div>  
      }
        
        <h3>Click to Check Your Messages</h3>
        <Link to="/chat/list">
          <button className="btn btn-dark csudh_red">See Messages</button>
        </Link>
        <h3>Link to Calendar</h3>
        <Link to="/calendar">
          <button className="btn btn-dark csudh_red">To calendar site</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
