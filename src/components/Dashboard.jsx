//import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";
// import navbar
import NavBar from "../routes/NavBar"; //import the navigation bar component

import { Card, Button, Container, Row, Col } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInputValue, setNameInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState("");
  const [timeInputValue, setTimeInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");
  const [locationInputValue, setLocationInputValue] = useState("");

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

  //get current user
  let currentUser = users.find(
    (user) => user.email == userEmail && user.password == password
  );

  const handleDeleteEvent = (eventName) => {
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

  const handleEditEvent = (event) => {
    //get current user
    setIsEditing(true);
  };

  const handleSaveEvent = (event) => {
    //get current user
    setIsEditing(false);
    console.log("previous event name", event.name);

    console.log("input values in state");
    console.log(nameInputValue);
    console.log(dateInputValue);
    console.log(timeInputValue);
    console.log(descriptionInputValue);
    console.log(locationInputValue);

    // create new event object to hold any changes
    let editedEvent = {
      name: "",
      date: "",
      time: "",
      description: "",
      location: "",
    };

    // if state variable is initialize item was changed
    if (nameInputValue === "") {
      editedEvent.name = event.name;
    } else {
      editedEvent.name = nameInputValue;
    }

    if (dateInputValue === "") {
      editedEvent.date = event.date;
    } else {
      editedEvent.date = dateInputValue;
    }

    if (timeInputValue === "") {
      editedEvent.time = event.time;
    } else {
      editedEvent.time = timeInputValue;
    }

    if (descriptionInputValue === "") {
      editedEvent.description = event.description;
    } else {
      editedEvent.description = descriptionInputValue;
    }

    if (locationInputValue === "") {
      editedEvent.location = event.location;
    } else {
      editedEvent.location = locationInputValue;
    }

    // update events to display on page
    let eventsList = events;

    //find specific event
    let indexToReplace = eventsList.findIndex(
      (fEvent) => fEvent.name == event.name
    );
    console.log("edited event ", editedEvent);

    if (indexToReplace !== -1) {
      eventsList[indexToReplace] = editedEvent;
    }

    setEvents(eventsList);

    //update local storage
    currentUser.events = eventsList;

    //find user in local storage to update
    //rewrite events in local storage
    //find index of object to replace
    let userList = users;
    let userToReplace = userList.findIndex(
      (user) => user.email == userEmail && user.password == password
    );

    if (userToReplace !== -1) {
      userList[indexToReplace] = currentUser;
    }

    localStorage.setItem("users", JSON.stringify(userList));

    console.log("updated users after edit save");
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
                      defaultValue={event.name}
                      disabled={!isEditing}
                      onChange={(e) => setNameInputValue(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="eventDate">Date:</label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      defaultValue={event.date}
                      disabled={!isEditing}
                      onChange={(e) => setDateInputValue(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="eventTime">Time:</label>
                    <input
                      type="time"
                      id="eventTime"
                      name="eventTime"
                      defaultValue={event.time}
                      disabled={!isEditing}
                      onChange={(e) => setTimeInputValue(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="eventDescription">Description:</label>
                    <textarea
                      id="eventDescription"
                      name="eventDescription"
                      rows="1"
                      defaultValue={event.description}
                      disabled={!isEditing}
                      onChange={(e) => setDescriptionInputValue(e.target.value)}
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="eventLocation">Location:</label>
                    <input
                      type="text"
                      id="eventLocation"
                      name="eventLocation"
                      defaultValue={event.location}
                      disabled={!isEditing}
                      onChange={(e) => setLocationInputValue(e.target.value)}
                    />
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => handleEditEvent(event)}
                    >
                      Edit
                    </button>

                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleSaveEvent(event)}
                      >
                        Save
                      </button>
                    )}

                    {!isEditing && (
                      <button
                        type="button"
                        onClick={() => handleDeleteEvent(event.name)}
                      >
                        Delete
                      </button>
                    )}
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
