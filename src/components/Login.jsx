import NavBar from "../routes/NavBar"; //import the navigation bar component
import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { useFormik } from "formik";

export default function Home() {
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

  // get login input
  const handleLogin = (email, password) => {
    //check if there is user with email and password in session storage
    let foundUser = users.find(
      (user) => user.email == email && user.password == password
    );

    if (foundUser) {
      //find user name and their current list of events
      setFirstName(foundUser.firstName);
      setEvents(foundUser.events);
      setLoggedIn(true);
    } else {
      alert("User not found. Please Register.");
    }
  };

  // set logout info
  const handleLogout = () => {
    setLoggedIn(false);
    setUserEmail("");
    setPassword("");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }
      return errors;
    },
    onSubmit: (values) => {
      //set username to welcome
      setUserEmail(values.email.toString());
      setPassword(values.password.toString());
      handleLogin(values.email.toString(), values.password.toString());
    },
  });

  //html for page to display
  return (
    <div id="login">
      {/* Display the navigation bar at the top of the page */}
      <NavBar />
      {loggedIn ? (
        <>
          <h1>Welcome {firstName}</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <form onSubmit={formik.handleSubmit} className="login-form">
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={
                  formik.touched.email && formik.errors.email
                    ? "input-error"
                    : ""
                }
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={
                  formik.touched.password && formik.errors.password
                    ? "input-error"
                    : ""
                }
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
              ) : null}
            </div>

            <button type="submit">Login</button>
          </form>
        </>
      )}
    </div>
  );
}
