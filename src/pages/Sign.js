import { Outlet } from "react-router-dom";
import Login from "../Util/Login";
import classes from "./Browse.module.css";

function SignPage() {
  return (
    <>
      <Login />;
      <Outlet />
    </>
  );
}

export default SignPage;
