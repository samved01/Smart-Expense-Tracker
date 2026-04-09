import { useContext } from "react";
import { ExpenseContext } from "./ExpenseContext";

const CATEGORIES = ["Food", "Travel", "Bills", "Shopping"];

export default function CategoryBudgets() {
  const { state, dispatch } = useContext(ExpenseContext);

  // Calculate spent per category
  const spentMap = {};
  state.expenses.forEach(e => {
    spentMap[e.category] =
      (spentMap[e.category] || 0) + e.amount;
  });

  return (
    <div className="card" style={{}}>
      <h3>Category Budgets</h3>
<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>


      {CATEGORIES.map(cat => {
  const budget = state.categoryBudgets[cat] || 0;
  const spent = spentMap[cat] || 0;
  const percent =
    budget > 0 ? Math.round((spent / budget) * 100) : 0;

  let status = "";
  let className = "";

  if (budget > 0 && percent >= 100) {
    status = "Exceeded";
    className = "danger";
  } else if (budget > 0 && percent >= 80) {
    status = "Near limit";
    className = "warning";
  }

  return (
    <div
      key={cat}
      style={{
        display: "grid",
        gridTemplateColumns: "120px 300px 1fr 140px",
        alignItems: "center",
        gap: "16px"
      }}
    >

      <strong>{cat}</strong>

 
      <input
        type="number"
        placeholder={`Set ${cat} budget`}
        value={budget || ""}
        style={{ color: "grey" }}
        onChange={e =>
          dispatch({
            type: "SET_CATEGORY_BUDGET",
            payload: {
              category: cat,
              amount: Number(e.target.value)
            }
          })
        }
      />

 
      <p style={{ margin: 0, whiteSpace: "nowrap" }}>
        Spent: ₹{spent} / Budget: ₹{budget}
      </p>


      <span className={`budget-alert ${className}`}>
        {status && `${status} (${percent}%)`}
      </span>
    </div>
  );
})}
</div>
    </div>
  );
}