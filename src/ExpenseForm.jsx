import { useContext, useState } from "react";
import { ExpenseContext } from "./ExpenseContext";

export default function ExpenseForm() {
  const { dispatch } = useContext(ExpenseContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("Offline"); // ✅ NEW

  function submit(e) {
    e.preventDefault();

    dispatch({
      type: "ADD",
      payload: {
        id: Date.now(),
        title,
        amount: Number(amount),
        category,
        date,
        paymentMode // ✅ NEW
      }
    });

    setTitle("");
    setAmount("");
    setDate("");
    setPaymentMode("Offline");
  }

  return (
    <form onSubmit={submit} className="card">
      <h3>Add Expense</h3>
<div className="form-row">

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
        />

      <input
        type="date"
        style={{color:'grey'}}
        value={date}
        onChange={e => setDate(e.target.value)}
        required
        />

      <select value={category} style={{color:'grey'}} onChange={e => setCategory(e.target.value)}>
        <option>Food</option>
        <option>Travel</option>
        <option>Bills</option>
        <option>Shopping</option>
      </select>

      {/* 💳 PAYMENT MODE */}
      <select
      style={{color:'grey'}}
      value={paymentMode}
      onChange={e => setPaymentMode(e.target.value)}
      >
        <option value="Offline">Offline (Cash)</option>
        <option value="Online">Online (UPI / Card)</option>
      </select>
        </div>

      <button className="btn">Add Expense</button>
    </form>
  );
}
