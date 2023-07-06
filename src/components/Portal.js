import ReactDOM from "react-dom";

const Portal = ({ children }) => {
  const el = document.getElementById("music-detail-portal");
  return ReactDOM.createPortal(children, el);
};

export default Portal;
