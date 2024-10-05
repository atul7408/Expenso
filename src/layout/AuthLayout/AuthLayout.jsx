import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BudjetContext } from "../../context/BudjetContext";
import Header from "../../features/Header/Header";

const AuthLayout = () => {
  const { userName } = useContext(BudjetContext);
  console.log("username", userName);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userName) {
      navigate("/");
    }
  }, []);
  return (
    <>
      {" "}
      <Header /> <Outlet />
    </>
  );
};
export default AuthLayout;
