import CalendarComponent from "../components/CalendarComponent"
import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";

const calendarPosition = {
    top: 120,
} as React.CSSProperties;

const buttonStyle = {
    maxWidth: "fit-content",
    position: "absolute",
    bottom: 10,
    marginLeft:10,
    
  } as React.CSSProperties;

function CalendarTest() {
    return (
        <div className="body-background" style={{paddingTop:115, paddingBottom: 20}}>
            <Navbar></Navbar>
            <div className="d-flex justify-content-center" style={calendarPosition}>
                <CalendarComponent />
            </div>
            <div style={buttonStyle}>
                <Link to="/">
                    <button className="btn btn-dark csudh_red">Back</button>
                </Link>
            </div>
            
        </div>
        
    )
}

export default CalendarTest;