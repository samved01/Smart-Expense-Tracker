import { useContext } from "react";
import { ExpenseContext } from "./ExpenseContext";

export default function IncomeCard() {
  const { state, dispatch } = useContext(ExpenseContext);

  const totalSpent = state.expenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const savings = state.income - totalSpent;

  return (
    <div className="card">
      <h3>Income & Savings</h3>

      <input
        style={{ color: 'grey' }}
        type="number"
        placeholder="Set Monthly Income"
        value={state.income || ""}
        onChange={e =>
          dispatch({
            type: "SET_INCOME",
            payload: Number(e.target.value)
          })
        }
      />

      <div style={{ marginTop: 12 }}>
        <p>Total Income: ₹{state.income}</p>
        <p>Expenses: ₹{totalSpent}</p>
        <p
          style={{
            fontWeight: 700,
            color: savings >= 0 ? "#22c55e" : "#ef4444"
          }}
        >
          Savings: ₹{savings}
        </p>
      </div>
    </div>
  );
}
