import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";

function Home() {
  var userIsTutor = false;
 
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  userIsTutor = user.willTutor;
    
  console.log(userIsTutor);
  
  
  return (
    <div className="body-background" style={{paddingTop:115}}>
      <Navbar></Navbar>
      <div className="m-2">
        <h1 className="d-flex justify-content-center">Welcome! Search for a student tutor or offer your tutoring services below.</h1>
        <p><br /></p>

        <h3>Click to See Available Tutors</h3>
        <Link to="/test">
          <button className="btn btn-dark csudh_red">Tutor Search</button>
        </Link>
        <p><br /></p>

        {userIsTutor ? <div>
          <h3>Click to Create a Tutoring Post</h3>
          <Link to="/Form">
            <button className="btn btn-dark csudh_red">Create Post</button>
          </Link>
          <p><br /></p>
        </div>
        
        : <div></div>  
      }

        <h3>Click to Check Your Messages</h3>
        <Link to="/chat/list">
          <button className="btn btn-dark csudh_red">See Messages</button>
        </Link>
        <p><br /></p>

        <h3>Click to See The Calendar</h3>
        <Link to="/calendar">
          <button className="btn btn-dark csudh_red">See Calendar</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
