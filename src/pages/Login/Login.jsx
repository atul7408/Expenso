import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { TextField, Typography } from "@mui/material";
import budget from "../../assets/png/budget.png";
import useInput from "../../hook/use-input";
import { BudjetContext } from "../../context/BudjetContext";
import Header from "../../features/Header/Header";
const Login = () => {
  const { userName: localUserName, setUserName } = useContext(BudjetContext);
  const navigate = useNavigate();
  const {
    value: userName,
    isValid: userNameIsValid,
    hasError: userNameHasError,
    valueChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: resetUserNameInput,
    ref: userNameRef,
  } = useInput((data) => {
    return data !== undefined && data !== null && data?.trim() !== "";
  });

  const handleFormSubmit = () => {
    if (userNameIsValid) {
      setUserName(userName);
      navigate("/dashboard");
    } else {
      userNameRef.current.focus();
    }
  };

  useEffect(() => {
    userNameRef.current.focus();
    if (localUserName) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Header />
      <section className={classes["login-main"]}>
        <div className={classes["login-content"]}>
          <p className="fs-600 fw-b mt-15">
            Master Your
            <span style={{ color: "var(--primary-color)" }}> Money </span>
            Today
          </p>
          <p className={"fs-400 mt-15"}>
            Personal budgeting unlocks financial freedom. Begin your journey
            now.
          </p>
          <TextField
            inputRef={userNameRef}
            label="What is your name?"
            size="small"
            sx={{ marginTop: "20px" }}
            onChange={userNameChangeHandler}
            onBlur={userNameBlurHandler}
            value={userName}
            error={userNameHasError}
          />
          <button
            type="submit"
            className="btn-black mt-15"
            onClick={() => {
              handleFormSubmit();
            }}
          >
            Create the Account
          </button>
        </div>
        <div className={classes["login-img"]}>
          <img src={budget} />
        </div>
      </section>
    </>
  );
};
export default Login;
