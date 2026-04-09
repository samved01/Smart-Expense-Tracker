import { useContext } from "react";
import { ExpenseContext } from "./ExpenseContext";

export default function Insights() {
  const { state } = useContext(ExpenseContext);
  const { expenses, budget, income } = state;

  if (expenses.length === 0) {
    return (
      <div className="card">
        <h3>Smart Insights</h3>
        <p className="empty">Add expenses to see insights</p>
      </div>
    );
  }


  const getMonthKey = (date) =>
    new Date(date).toISOString().slice(0, 7);

  const currentMonth = new Date().toISOString().slice(0, 7);
  const prevMonth = new Date(
    new Date().setMonth(new Date().getMonth() - 1)
  ).toISOString().slice(0, 7);



  let currentTotal = 0;
  let previousTotal = 0;

  const categoryMap = {};

  expenses.forEach((e) => {
    if (!e.date) return;

    const month = getMonthKey(e.date);

    if (month === currentMonth) currentTotal += e.amount;
    if (month === prevMonth) previousTotal += e.amount;

    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + e.amount;
  });

  
  
  const topCategory = Object.keys(categoryMap).reduce(
    (a, b) => (categoryMap[a] > categoryMap[b] ? a : b),
    Object.keys(categoryMap)[0]
  );


  const insights = [];

  if (previousTotal > 0) {
    const diff = currentTotal - previousTotal;
    const percent = Math.round((diff / previousTotal) * 100);

    if (diff > 0) {
      insights.push(
        `📈 Your spending increased by ${percent}% compared to last month`
      );
    } else if (diff < 0) {
      insights.push(
        `📉 Good job! You spent ${Math.abs(percent)}% less than last month`
      );
    }
  }

  insights.push(
    `🍔 Your highest spending category is "${topCategory}"`
  );

  if (budget > 0 && currentTotal > budget) {
    insights.push(
      `⚠️ You exceeded your monthly budget by ₹${currentTotal - budget}`
    );
  }

  if (income > 0 && currentTotal < income) {
    insights.push(
      `💡 You saved ₹${income - currentTotal} this month`
    );
  }

  return (
    <div className="card">
      <h3>Smart Insights</h3>

      <ul style={{ paddingLeft: 18 }}>
        {insights.map((text, i) => (
          <li key={i} style={{ marginBottom: 8 }}>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
