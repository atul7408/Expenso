import { useContext } from "react";
import { BudjetContext } from "../../context/BudjetContext";

const Greet = () => {
  const { userName } = useContext(BudjetContext);
  return (
    <>
      <p className="fs-600 fw-b mb-20">
        Welcome back,{" "}
        <span style={{ color: "var(--primary-color)" }}>{userName}</span>
      </p>
    </>
  );
};
export default Greet;
