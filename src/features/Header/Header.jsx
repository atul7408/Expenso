import { Typography } from "@mui/material";
import logo from "../../assets/png/logo.png";
import classes from "./Header.module.css";
import { useContext, useEffect } from "react";
import { BudjetContext } from "../../context/BudjetContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { userName, setUserName, setExpenses, setBudgets } =
    useContext(BudjetContext);
  const navigate = useNavigate();
  return (
    <>
      <header className={classes.nav}>
        <div
          className={classes.logo}
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <img src={logo} height={30} />
          <Typography className={`${classes.title} fs-400 fw-b`} variant="p">
            Budget Tracker
          </Typography>
        </div>
        {userName && (
          <button
            className="btn-error"
            style={{ alignSelf: "center" }}
            onClick={() => {
              setUserName(null);
              setBudgets([]);
              setExpenses([]);
              navigate("/");
            }}
          >
            Delete User
          </button>
        )}
      </header>
    </>
  );
};

export default Header;
