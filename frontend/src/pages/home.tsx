import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
    setFirstName(user.first_name);
  });
  return (
    <>
      <h1>Hello {firstName}</h1>
      <div>
        <h1>Link to search</h1>
        <Link to="/test">
          <button>To test site</button>
        </Link>
        <h2>Register</h2>
        <Link to="/register">
          <button>Register Here</button>
        </Link>
        <h2>Login</h2>
        <Link to="/Login">
          <button>Login</button>
        </Link>
        <h3>Form</h3>
        <Link to="/Form">
          <button>Form</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
