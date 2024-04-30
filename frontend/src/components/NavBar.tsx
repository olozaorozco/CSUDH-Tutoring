import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
    const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
    setFirstName(user.first_name);
  });

    return(
        <nav className='navbar navbar-dark csudh_red' style={{minHeight:108}}>
             <h1>Hello {firstName}</h1>
             <Link to="/Login">
                <button className="btn btn-primary btn_margin" >Login</button>
             </Link>
        </nav>
    );
}

export default Navbar;