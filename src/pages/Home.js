import { useEffect } from "react";
import useStore from "../store/MusicStore";
import { useNavigate, Outlet } from "react-router-dom";
import classes from "./Browse.module.scss";

function HomePage() {
  const navigate = useNavigate();
  const token = useStore((state) => state.userToken);

  useEffect(() => {
    if (!token) {
      navigate("/sign_in");
    } else {
      navigate("/browse");
    }
  }, [token]);

  return (
    <>
      <main>
        <div className={classes.main}>
          <Outlet />
        </div>
      </main>
    </>
  );
}
export default HomePage;
