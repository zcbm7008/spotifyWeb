import { useEffect } from "react";
import Login from "../Util/Login";
import useStore from "../store/MusicStore";
import { Link, useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  const token = useStore((state) => state.userToken);
  console.log(token);

  useEffect(() => {
    if (!token) {
      navigate("/sign_in");
    }
  });

  return (
    <>
      <h2>Logiined</h2>
    </>
  );
}
export default HomePage;
