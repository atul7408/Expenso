import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login/Login";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import BudgetDetail from "../pages/BudgetDetail/BudgetDetail";
import NotFound from "../features/NotFound/NotFound";

const router = createBrowserRouter([
  {
    index: true,
    element: <Login />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "budget",
        element: <BudgetDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const MainRouter = () => {
  return <RouterProvider router={router} />;
};
export default MainRouter;
