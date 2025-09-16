//import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";
// import navbar
import NavBar from "../routes/NavBar"; //import the navigation bar component

import { Card, Button, Container, Row, Col } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  // getting states from app context
  const {
    firstName,
    setFirstName,
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

  if (loggedIn) {
    // get current list of events and store to user (for after add)
    //get user and update events
    let currentUser = users.find(
      (user) => user.email == userEmail && user.password == password
    );
    currentUser.events = events;

    //find index of object to replace
    let userList = users;
    let indexToReplace = userList.findIndex(
      (user) => user.email == userEmail && user.password == password
    );

    if (indexToReplace !== -1) {
      userList[indexToReplace] = currentUser;
    }

    localStorage.setItem("users", JSON.stringify(userList));

    console.log("users after updating local storage ", users);
  }

  const handleDeleteEvent = (eventName) => {
    console.log(`Button delete was clicked.`);
    console.log(eventName);

    //get current user
    let currentUser = users.find(
      (user) => user.email == userEmail && user.password == password
    );

    let userEvents = currentUser.events;

    //take out event with name
    currentUser.events = userEvents.filter((event) => event.name != eventName);
    //rewrite events in local storage
    //find index of object to replace
    let userList = users;
    let indexToReplace = userList.findIndex(
      (user) => user.email == userEmail && user.password == password
    );

    if (indexToReplace !== -1) {
      userList[indexToReplace] = currentUser;
    }

    localStorage.setItem("users", JSON.stringify(userList));

    setEvents(currentUser.events);
  };

  return (
    <div>
      <NavBar />

      {loggedIn == false ? (
        <h2>Login to see dashboard.</h2>
      ) : (
        <div>
          <h2 className="mb-4">Events</h2>

          {events.length === 0 ? (
            <p>
              No current events for <b>{firstName}</b>.
            </p>
          ) : (
            <div>
              {events.map((event) => (
                <div>
                  <div>
                    <label htmlFor="eventName">Name:</label>
                    <input
                      type="text"
                      id="eventName"
                      name="eventName"
                      value={event.name}
                    />
                  </div>

                  <div>
                    <label htmlFor="eventDate">Date:</label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={event.date}
                    />
                  </div>

                  <div>
                    <label htmlFor="eventTime">Time:</label>
                    <input
                      type="time"
                      id="eventTime"
                      name="eventTime"
                      value={event.time}
                    />
                  </div>

                  <div>
                    <label htmlFor="eventDescription">Description:</label>
                    <textarea
                      id="eventDescription"
                      name="eventDescription"
                      rows="1"
                      value={event.description}
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="eventLocation">Location:</label>
                    <input
                      type="text"
                      id="eventLocation"
                      name="eventLocation"
                      value={event.location}
                    />
                  </div>

                  <div>
                    <button type="button">Edit</button>
                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(event.name)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
