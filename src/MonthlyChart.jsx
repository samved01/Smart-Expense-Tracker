import { useContext } from "react";
import { ExpenseContext } from "./ExpenseContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function MonthlyChart() {
  const { state } = useContext(ExpenseContext);

  const map = {};
  state.expenses.forEach(e => {
    if (!e.date) return;
    const m = new Date(e.date).toLocaleString("default", { month: "short", year: "numeric" });
    map[m] = (map[m] || 0) + e.amount;
  });

  const data = Object.keys(map).map(m => ({
    month: m,
    amount: map[m]
  }));

  if (data.length === 0) return <p>No monthly data</p>;

  return (
    <>
      <h3>Monthly</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
