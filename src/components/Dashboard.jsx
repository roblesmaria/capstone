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
            <Container className="my-5">
              <Row>
                {/* Step 2: Use .map() to display the events */}
                {events.map((event) => (
                  <Col md={4} className="mb-4" id={event.name}>
                    {/* Step 3: Use a Bootstrap Card for each event */}
                    <Card>
                      <Card.Body>
                        <Card.Title>{event.name}</Card.Title>
                        <Card.Text>
                          Date: {event.date} | Time: {event.time} | Description:{" "}
                          {event.description} | Location: {event.location}
                        </Card.Text>
                        {/* Step 4: Add edit and delete buttons */}
                        <Button
                          variant="primary"
                          className="me-2"
                          onClick={() => handleEdit(event.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(event.id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          )}
        </div>
      )}
    </div>
  );
}
