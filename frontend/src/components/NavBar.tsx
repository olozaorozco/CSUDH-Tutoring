import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/style1.css";
import LOGO from "../css/CSUDH_LOGO.png";

function Navbar() {
    const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
    setFirstName(user.first_name);
  });

  const navStyle = {
    minHeight:108, 
    position: "fixed",
    width: "100%",
    top: 0,
  } as React.CSSProperties;

    return(
        <nav className='navbar navbar-dark csudh_red' style={navStyle}>
             <img src={LOGO} alt="CSUDH LOGO" className = "csudh_logo"></img>
             <h1 style={{color:"black", marginRight:150}}>Hello {firstName}</h1>
             <Link to="/Login">
                <button className="btn btn-primary btn_margin" >Logout</button>
             </Link>
        </nav>
    );
}

export default Navbar;