import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../api";
import Navbar from "../components/NavBar";

function ScheduleSession() {
    const [tutoringFormId, setTutoringFormId] = useState('');
    const [tutoringDate, setTutoringDate] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/tutoringsessions", {
                TutoringForm: tutoringFormId,
                Student: "your-user-id", 
                Tutoring_Date: tutoringDate,
                Location: location
            });
            alert("Session scheduled successfully!");
            navigate("/");
        } catch (error) {
            console.error("Failed to schedule session:", error);
            alert("Failed to schedule session. Please try again.");
        }
    };

    return (
        
        <form onSubmit={handleSubmit}>
            <div>
                <label>Tutoring Form ID:</label>
                <input type="text" value={tutoringFormId} onChange={e => setTutoringFormId(e.target.value)} />
            </div>
            <div>
                <label>Tutoring Date:</label>
                <input type="date" value={tutoringDate} onChange={e => setTutoringDate(e.target.value)} />
            </div>
            <div>
                <label>Location:</label>
                <input type="number" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-dark csudh_red">Schedule Session</button>
        </form>
    );
}

export default ScheduleSession;
