import { useContext } from "react";
import { BudjetContext } from "../../context/BudjetContext";
import classes from "./CreateBudget.module.css";
import { TextField } from "@mui/material";
import useInput from "../../hook/use-input";
const CreateBudget = () => {
  const { addBudgets } = useContext(BudjetContext);
  const {
    value: budget,
    isValid: budgetIsValid,
    hasError: budgetHasError,
    valueChangeHandler: budgetChangeHandler,
    inputBlurHandler: budgetBlurHandler,
    reset: resetBudgetInput,
    ref: budgetRef,
  } = useInput((data) => {
    return data !== undefined && data !== null && data?.trim() !== "";
  });
  const {
    value: cost,
    isValid: costIsValid,
    hasError: costHasError,
    valueChangeHandler: costChangeHandler,
    inputBlurHandler: costBlurHandler,
    reset: resetCostInput,
    ref: costRef,
  } = useInput((data) => {
    return (
      Number.isInteger(Number(data)) &&
      data !== undefined &&
      data !== null &&
      data?.trim() !== ""
    );
  });
  const handleBudget = () => {
    if (costIsValid && budgetIsValid) {
      addBudgets(budget, cost);
      resetBudgetInput();
      resetCostInput();
    } else {
      if (!budgetIsValid) {
        budgetRef.current.focus();
      } else {
        costRef.current.focus();
      }
    }
  };
  return (
    <div className={"border-card"}>
      <p className={"fs-400 fw-b"}>Create Budget</p>
      <TextField
        inputRef={budgetRef}
        label="Budget Name"
        placeholder="e.g., Food"
        size="small"
        sx={{ marginTop: "20px" }}
        onChange={budgetChangeHandler}
        onBlur={budgetBlurHandler}
        value={budget}
        error={budgetHasError}
        fullWidth
      />
      <br />
      <TextField
        inputRef={costRef}
        label="Amount"
        placeholder="e.g., 100"
        size="small"
        sx={{ marginBlock: "20px" }}
        onChange={costChangeHandler}
        onBlur={costBlurHandler}
        value={cost}
        error={costHasError}
        fullWidth
      />
      <button
        className="btn-black"
        onClick={() => {
          handleBudget();
        }}
      >
        Create Budget
      </button>
    </div>
  );
};
export default CreateBudget;
