import { Outlet } from "react-router-dom";
import Login from "../Util/Login";

function SignPage() {
  return (
    <>
      <Login />;
      <Outlet />
    </>
  );
}

export default SignPage;
