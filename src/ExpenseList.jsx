import { useContext, useState } from "react";
import { ExpenseContext } from "./ExpenseContext";

export default function ExpenseList() {
  const { state, dispatch } = useContext(ExpenseContext);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [mode, setMode] = useState("All");


  const filteredExpenses = state.expenses.filter(exp => {
    const matchTitle = exp.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || exp.category === category;

    return matchTitle && matchCategory;
  });


  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sort === "newest") return new Date(b.date) - new Date(a.date);
    if (sort === "oldest") return new Date(a.date) - new Date(b.date);
    if (sort === "high") return b.amount - a.amount;
    if (sort === "low") return a.amount - b.amount;
    return 0;
  });


  function exportCSV() {
    if (sortedExpenses.length === 0) return;

    const headers = ["Title", "Amount", "Category", "Date"];

    const rows = sortedExpenses.map(e => [
      e.title,
      e.amount,
      e.category,
      e.date
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "expenses.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  if (state.expenses.length === 0) {
    return <div className="empty">No expenses added yet</div>;
  }

  return (
    <>
      <h3>Expenses</h3>


      <input
        placeholder="Search by title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select style={{color:'grey'}} value={category} onChange={e => setCategory(e.target.value)}>
        <option value="All">All Categories</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
        <option value="Shopping">Shopping</option>
      </select>

      <select style={{color:'grey'}} value={sort} onChange={e => setSort(e.target.value)}>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="high">Amount: High → Low</option>
        <option value="low">Amount: Low → High</option>
      </select>

      <select style={{color:'grey'}} value={mode} onChange={e => setMode(e.target.value)}>
        <option value="All">All Payments</option>
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
      </select>



      <button className="btn" onClick={exportCSV}>
        Export CSV
      </button>

<div>
  <hr />
        <h3 style={{color:'aqua'}}>Recent History</h3>
</div>

      {sortedExpenses.length === 0 ? (
        <div className="empty" >No matching expenses</div>
      ) : (
        sortedExpenses.map(exp => (
          <div key={exp.id} className="list-item">
            <span>
              {exp.title} ({exp.category})
            </span>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span>₹{exp.amount}</span>
              {exp.isRecurring && (
                <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                  🔁 Monthly
                </span>
              )}
              <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                {exp.paymentMode === "Online" ? "💳 Online" : "💵 Offline"}
              </span>
              <button
                onClick={() =>
                  dispatch({ type: "DELETE", payload: exp.id })
                }
              >
                ❌
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
