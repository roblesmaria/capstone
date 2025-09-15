//import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";
// import navbar
import NavBar from "../routes/NavBar";

import { useFormik } from "formik";

const AddEvent = () => {
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

  const formik = useFormik({
    initialValues: {
      eventName: "",
      date: "",
      time: "",
      description: "",
      location: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.eventName) {
        errors.eventName = "Event Name is required";
      }
      if (!values.date) {
        errors.date = "Date is required";
      }
      if (!values.time) {
        errors.time = "Time is required";
      }
      if (!values.description) {
        errors.description = "Description is required";
      }
      if (!values.location) {
        errors.location = "Location is required";
      }

      // You can add more complex validation rules here,
      // e.g., date format validation, time format validation, etc.

      return errors;
    },
    onSubmit: (values) => {
      // Handle form submission, e.g., send data to an API
      console.log("Event submitted:", values);

      //create event object to store in events

      alert("Event Created!");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="eventName">Event Name:</label>
        <input
          id="eventName"
          name="eventName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.eventName}
        />
        {formik.touched.eventName && formik.errors.eventName ? (
          <div>{formik.errors.eventName}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          name="date"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date}
        />
        {formik.touched.date && formik.errors.date ? (
          <div>{formik.errors.date}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="time">Time:</label>
        <input
          id="time"
          name="time"
          type="time"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.time}
        />
        {formik.touched.time && formik.errors.time ? (
          <div>{formik.errors.time}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div>{formik.errors.description}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          name="location"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.location}
        />
        {formik.touched.location && formik.errors.location ? (
          <div>{formik.errors.location}</div>
        ) : null}
      </div>

      <button type="submit">Add Event</button>
      <hr></hr>
    </form>
  );
};

export default AddEvent;
