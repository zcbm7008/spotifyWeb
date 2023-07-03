import "./App.css";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "./Util/ErrorBoundary";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import Login from "./Util/Login";
import CallbackHelper from "./Util/CallbackHelper";
import LikesPage from "./pages/Likes";
import ErrorPage from "./pages/Error";
import BrowseLayout from "./pages/Browse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true,
        path: "sign_in",
        element: <Login />,
      },
      {
        path: "browse",
        element: [<RootLayout />],
        children: [
          {
            element: [<BrowseLayout />],
            children: [
              {
                path: "likes",
                element: [<LikesPage />],
              },
            ],
          },
        ],
      },
      {
        path: "callback",
        element: <CallbackHelper />,
      },
      {
        path: "error",
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
