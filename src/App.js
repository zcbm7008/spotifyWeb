import "./App.css";
import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import ErrorBoundary from "./Util/ErrorBoundary";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import Login from "./Util/Login";
import CallbackHelper from "./Util/CallbackHelper";
import LikesPage from "./pages/Likes";
import ListsLayout from "./pages/Lists";
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
        element: [<RootLayout />, <ListsLayout />, <BrowseLayout />],
        children: [
          {
            path: "likes",
            element: <LikesPage />,
          },
        ],
      },
      {
        path: "callback",
        element: <CallbackHelper />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
