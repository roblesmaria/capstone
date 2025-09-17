import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // for router

// import AppContext for state usages
import { AppContextProvider } from "./AppContext.jsx";

// Import components
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AddEvent from "./components/AddEvent.jsx";
import Help from "./components/Help.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/addevent",
    element: <AddEvent />,
  },
  {
    path: "/help",
    element: <Help />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* wrap router in app context*/}
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>
);
