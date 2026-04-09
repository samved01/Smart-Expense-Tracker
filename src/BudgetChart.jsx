import { useContext } from "react";
import { ExpenseContext } from "./ExpenseContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function BudgetChart() {
  const { state, dispatch } = useContext(ExpenseContext);

  const spent = state.expenses.reduce((sum, e) => sum + e.amount, 0);
  const budget = state.budget;

  const percentUsed =
    budget > 0 ? Math.round((spent / budget) * 100) : 0;

  let statusText = "";
  let statusClass = "";

  if (budget > 0 && percentUsed >= 100) {
    statusText = "🚨 Budget exceeded!";
    statusClass = "danger";
  } else if (budget > 0 && percentUsed >= 80) {
    statusText = "⚠️ You’ve used 80% of your budget";
    statusClass = "warning";
  }

  const data = [
    { name: "Budget", amount: budget },
    { name: "Spent", amount: spent }
  ];

  return (
    <>
      <h3>Budget vs Spent</h3>

      <input
        style={{ color: 'grey' }}
        type="number"
        placeholder="Set Monthly Budget"
        value={budget || ""}
        onChange={e =>
          dispatch({
            type: "SET_BUDGET",
            payload: Number(e.target.value)
          })
        }
      />

      {statusText && (
        <div className={`budget-alert ${statusClass}`}>
          {statusText} ({percentUsed}%)
        </div>
      )}

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
