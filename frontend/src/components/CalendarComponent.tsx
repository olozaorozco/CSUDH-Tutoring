import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link, useNavigate } from "react-router-dom";

const calendarStyle = {
  //width: 5000,
} as React.CSSProperties;

function CalendarComponent() {
  const navigate = useNavigate();
  const onChange = (e) => {
    const day = e.toDateString().split(' ')[0];
    const date = e.toISOString().split('T')[0];
    return navigate(`${day}/${date}`);
  }
  return (
    <>
      <div className="border border-dark" style={calendarStyle}>
        <Calendar onChange={onChange} />
      </div>
    </>
  )
}
export default CalendarComponent;
