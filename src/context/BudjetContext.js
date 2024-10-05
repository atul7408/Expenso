import { createContext } from "react";
import useLocalStorage from "../hook/use-localstorage";
export const BudjetContext = createContext();
const BudjetContextProvider = ({ children }) => {
  const [userName, setUserName] = useLocalStorage("userName", null);
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const generateRandomColor = (val) => {
    return `${val * 34} 55% 40%`;
  };
  const randomId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };
  function createDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

    return `${day}/${month}/${year}`;
  }
  const addBudgets = (budget, cost) => {
    console.log("randomId", randomId());
    const id = randomId();
    console.log([
      ...budgets,
      {
        budgetId: id,
        budget,
        cost,
        color: generateRandomColor(budgets.length),
        createAt: createDate(),
      },
    ]);

    setBudgets([
      ...budgets,
      {
        budgetId: id,
        budget,
        cost,
        color: generateRandomColor(budgets.length),
        createAt: createDate(),
      },
    ]);
  };

  const addExpense = (budgetId, expense, cost) => {
    setExpenses([
      ...expenses,
      {
        expenseId: randomId(),
        expense,
        cost,
        budgetId,
        createAt: createDate(),
      },
    ]);
    console.log("addexpense");
    console.log("budget", budgets);
  };

  const calculateSpentByBudget = (budgetId) => {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].budgetId == budgetId) {
        total += Number(expenses[i].cost);
      }
    }
    return total;
  };
  const getBudget = (budgetId) => {
    return budgets.filter((item) => item.budgetId == budgetId);
  };
  const getExpenseByBudget = (budgetId) => {
    return expenses.filter((item) => item.budgetId == budgetId);
  };
  const deleteExpense = (expenseId) => {
    const filterExpense = expenses.filter(
      (item) => item.expenseId !== expenseId
    );
    setExpenses(filterExpense);
  };
  const deleteBudget = (budgetId) => {
    const filterBudget = budgets.filter((item) => item.budgetId !== budgetId);
    setBudgets(filterBudget);
    const filterExpense = expenses.filter((item) => item.budgetId !== budgetId);
    setExpenses(filterExpense);
  };
  return (
    <BudjetContext.Provider
      value={{
        userName,
        setUserName,
        setBudgets,
        setExpenses,
        budgets,
        expenses,
        addBudgets,
        addExpense,
        calculateSpentByBudget,
        getBudget,
        deleteExpense,
        getExpenseByBudget,
        deleteBudget,
      }}
    >
      {children}
    </BudjetContext.Provider>
  );
};
export default BudjetContextProvider;
