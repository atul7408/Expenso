import { useNavigate } from "react-router-dom";
import classes from "./NotFound.module.css";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={`${classes["center"]}`}>
      <h2 className={`${classes["title"]} fs-600 fw-b`}>404 | Not Found</h2>
      <p
        className={`${classes["back"]} fs-300`}
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        Back to Home
      </p>
    </div>
  );
};
export default NotFound;
