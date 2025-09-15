//import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";
// import navbar
import NavBar from "../routes/NavBar"; //import the navigation bar component
import AddEvent from "./AddEvent";

export default function Dashboard() {
  // getting states from app context
  const {
    userEmail,
    setUserEmail,
    loggedIn,
    setLoggedIn,
    password,
    setPassword,
    events,
    setEvents,
    users,
    setUsers,
  } = useContext(AppContext);

  return (
    <div>
      <NavBar />

      <AddEvent />

      {/* <div>
        {events.map((event) => (
          <div key={event.id}>
            <h3>{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Location: {event.location}</p>
            <p>{event.description}</p>
            <button onClick={() => onEdit(event.id)}>Edit</button>
            <button onClick={() => onDelete(event.id)}>Delete</button>
          </div>
        ))}
      </div> */}
    </div>
  );
}
