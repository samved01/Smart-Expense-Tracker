import { useContext } from "react";
import { ExpenseContext } from "./ExpenseContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ExpenseChart() {
  const { state } = useContext(ExpenseContext);

  const map = {};
  state.expenses.forEach(e => {
    map[e.category] = (map[e.category] || 0) + e.amount;
  });

  const data = Object.keys(map).map(k => ({
    category: k,
    amount: map[k]
  }));

  if (data.length === 0) return <p>No chart data</p>;

  return (
    <>
      <h3>Category-wise</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
