import { useContext, useEffect, useState } from "react";
import { BudjetContext } from "../../context/BudjetContext";
import classes from "./AddExpense.module.css";
import { MenuItem, Stack, TextField } from "@mui/material";
import useInput from "../../hook/use-input";
import { useLocation } from "react-router-dom";
const AddExpense = () => {
  const { budgets, addExpense } = useContext(BudjetContext);
  const location = useLocation();
  const [budget, setBudget] = useState("");
  const {
    value: expense,
    isValid: expenseIsValid,
    hasError: expenseHasError,
    valueChangeHandler: expenseChangeHandler,
    inputBlurHandler: expenseBlurHandler,
    reset: resetExpenseInput,
    ref: expenseRef,
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
  useEffect(() => {
    setBudget(budgets[0]?.budgetId);
  }, []);

  const handleExpense = () => {
    if (costIsValid && expenseIsValid) {
      addExpense(location?.state?.id || budget, expense, cost);
      resetExpenseInput();
      resetCostInput();
    } else {
      if (!expenseIsValid) {
        expenseRef.current.focus();
      } else {
        costRef.current.focus();
      }
    }
  };
  return (
    <div className={"border-card"}>
      <p className={"fs-400 fw-b"}>Add Expense</p>
      <Stack direction={budgets.length > 1 ? "row" : "column"} gap={"10px"}>
        <TextField
          inputRef={expenseRef}
          label="Expense Name"
          placeholder="e.g., Biriyani"
          size="small"
          sx={{ marginTop: "20px" }}
          onChange={expenseChangeHandler}
          onBlur={expenseBlurHandler}
          value={expense}
          error={expenseHasError}
          fullWidth
        />
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
      </Stack>
      {budgets.length > 1 && !location?.state?.id && (
        <TextField
          select
          label="Select Budget"
          value={budget}
          onChange={(e) => {
            setBudget(e.target.value);
          }}
          variant="outlined"
          size="small"
          fullWidth
          sx={{ marginBottom: "20px" }}
        >
          {budgets?.map((budget, i) => {
            return (
              <MenuItem value={budget.budgetId} key={i}>
                {budget?.budget}
              </MenuItem>
            );
          })}
        </TextField>
      )}

      <button
        className="btn-black"
        onClick={() => {
          handleExpense();
        }}
      >
        Add Expense
      </button>
    </div>
  );
};
export default AddExpense;
