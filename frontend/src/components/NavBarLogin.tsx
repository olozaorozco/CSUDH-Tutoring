import { Link } from "react-router-dom";
import "../css/style1.css";
import LOGO from "../css/CSUDH_LOGO.png";

function NavbarLogin() {

    return(
        <nav className='navbar navbar-dark csudh_red' style={{minHeight:108}}>
             <img src={LOGO} alt="CSUDH LOGO" className = "csudh_logo"></img>
             <h1 style={{color:"black", marginRight:150}}>Welcome!</h1>
             <Link to="/Register">
                <button className="btn btn-primary btn_margin" >Register</button>
             </Link>
        </nav>
    );
}

export default NavbarLogin;