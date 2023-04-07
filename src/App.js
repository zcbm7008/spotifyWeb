import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import Login from "./Util/Login";

const router = createBrowserRouter([
  {
    path: "/sign_in",
    element: <Login />,
  },
  {
    path: "/",

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "browse",
        element: <RootLayout />,
        children: [{ index: true, element: <></> }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
