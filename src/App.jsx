import { useEffect, useState } from "react";
import { ExpenseProvider } from "./ExpenseContext";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseChart from "./ExpenseChart";
import MonthlyChart from "./MonthlyChart";
import BudgetChart from "./BudgetChart";
import IncomeCard from "./IncomeCard";
import Insights from "./Insights";
import CategoryBudgets from "./CategoryBudgets";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );
  useEffect(() => {
    document.body.className = theme === "light" ? "light" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ExpenseProvider>
      <div className="container">
        <div className="header" >
          <div>
            <h1>Expense <span style={{ color: 'aquamarine', }}>Tracker</span></h1>
            <p>Track your spending smartly</p>
          </div>

          <button
            className="btn"
            onClick={() =>
              setTheme(prev => (prev === "dark" ? "light" : "dark"))
            }
          >
            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>

        <ExpenseForm />
        <Insights />
        <CategoryBudgets />

        <div className="grid">
          <div>

            <div className="card chart-box">
              <MonthlyChart />
            </div>
            <div className="card chart-box">
              <IncomeCard />
            </div>

          </div>

          <div>
            <div className="card chart-box">
              <ExpenseChart />
            </div>
            <div className="card chart-box">
              <BudgetChart />
            </div>
          </div>
        </div>

        <div className="card">
          <ExpenseList />
        </div>
      </div>

    </ExpenseProvider>

  );
}

export default App;
