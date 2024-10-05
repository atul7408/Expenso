import { useContext, useEffect } from "react";
import { BudjetContext } from "../../context/BudjetContext";
import { useLocation, useNavigate } from "react-router-dom";
import BudgetCard from "../../features/BudgetCard/BudgetCard";
import classes from "./BudgetDetaill.module.css";
import AddExpense from "../../features/AddExpense/AddExpense";
import ExpenseTable from "../../features/ExpenseTable/ExpenseTable";
const BudgetDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getBudget, getExpenseByBudget, deleteExpense } =
    useContext(BudjetContext);
  const budget = getBudget(location?.state?.id);
  const expenses = getExpenseByBudget(location?.state?.id);
  const columns = ["Name", "Amount", "Date", "Action"];
  const rowKey = [
    { key: "expense" },
    { key: "cost" },
    { key: "createAt" },
    {
      key: "action",
      renderCell: (data) => {
        return (
          <button
            onClick={() => {
              deleteExpense(data.expenseId);
            }}
            className="btn-error"
          >
            Delete
          </button>
        );
      },
    },
  ];
  useEffect(() => {
    if (!location?.state?.id) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <section className={classes["budget-container"]}>
      {budget.length > 0 && (
        <>
          <p className="fs-500 fw-b mt-20 mb-20">
            <span style={{ color: `hsl(${budget[0]?.color})` }}>
              {budget[0]?.budget}{" "}
            </span>
            Budgets
          </p>
          <div className={classes["grid-item"]}>
            {" "}
            {budget.map((budget, i) => {
              return <BudgetCard key={i} budget={budget} deleteAction={true} />;
            })}
            <AddExpense />
          </div>
        </>
      )}
      <div>
        {expenses.length > 0 && (
          <>
            <p className="fs-500 fw-b mt-20 mb-20">
              <span style={{ color: `hsl(${budget[0]?.color})` }}>
                {budget[0]?.budget}{" "}
              </span>{" "}
              Expenses
            </p>
            <ExpenseTable columns={columns} rows={expenses} rowKey={rowKey} />
          </>
        )}
      </div>
    </section>
  );
};

export default BudgetDetail;
