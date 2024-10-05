import { LinearProgress, Stack } from "@mui/material";
import classes from "./BudgetCard.module.css";
import { useContext } from "react";
import { BudjetContext } from "../../context/BudjetContext";
import { useNavigate } from "react-router-dom";
const BudgetCard = ({ budget, deleteAction = false }) => {
  const { budget: budgetName, budgetId, color, cost } = budget;
  const { calculateSpentByBudget, deleteBudget } = useContext(BudjetContext);
  const navigate = useNavigate();
  const spent = calculateSpentByBudget(budgetId);
  return (
    <div style={{ "--color": color }}>
      <div className={classes["budget-card"]}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          style={{ marginBottom: "1em" }}
        >
          <p className="fs-400 fw-b">{budgetName}</p>
          <p className="fs-400 ">{cost} Budgeted</p>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={spent <= cost ? (spent / cost) * 100 : 100}
          sx={{
            height: 10,
            borderRadius: 5,
            "& .MuiLinearProgress-bar": {
              backgroundColor: "hsl(var(--color))", // Set the color of the progress bar
            },
            backgroundColor: "#bac4bd", // Optional: Set the track background color to a lighter version
          }}
        />
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          style={{ marginTop: "1em" }}
        >
          <p className="fs-200">{spent} spent</p>
          <p className="fs-200 ">{cost - spent} remaining</p>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"center"}
          style={{ marginTop: "1em" }}
        >
          {deleteAction ? (
            <button
              className="btn-color"
              onClick={() => {
                deleteBudget(budgetId);
                navigate("/");
              }}
            >
              Delete Budget
            </button>
          ) : (
            <button
              className="btn-color"
              onClick={() => {
                navigate("/budget", { state: { id: budgetId } });
              }}
            >
              View Details
            </button>
          )}
        </Stack>
      </div>
    </div>
  );
};
export default BudgetCard;
