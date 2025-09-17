import NavBar from "../routes/NavBar"; //import the navigation bar component
import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { useFormik } from "formik";

export default function Dashboard() {
  return (
    <div>
      <NavBar />
      <h1>Help Section</h1>

      <div>
        <h2>Navigation</h2>
        <p>
          You can access different pages using the navigation bar at the top of
          the page.
        </p>
      </div>

      <div>
        <h2>Register</h2>
        <p>
          You can register for an account if you do not have one already by
          accessing the Register page. To register you need to provide a first
          name, last name, username, email, and password. Password requirements
          are stated on the page.
        </p>
      </div>

      <div>
        <h2>Event Management</h2>
        <p>
          New events can be created on the Add Event page by entering a name,
          date, time, description, and location. The Dashboard shows your
          current events and allows for editing details of events or deleting
          events.
        </p>
      </div>
    </div>
  );
}
