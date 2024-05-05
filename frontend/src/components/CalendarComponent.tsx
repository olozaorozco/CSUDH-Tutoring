import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link, useNavigate } from "react-router-dom";

function CalendarComponent() {
  const navigate = useNavigate();
  const onChange = (date) => navigate(date.toISOString().split('T')[0]);
  return (
    <>
    <div>
      <Calendar onChange={onChange}/>
    </div>
    <Link to="/">
        <button>Back</button>
      </Link>
    </>
  )
}
export default CalendarComponent;
