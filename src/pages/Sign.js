import { Outlet } from "react-router-dom";
import Login from "../Util/Login";

function SignPage() {
  return (
    <>
      <Login />;
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default SignPage;
