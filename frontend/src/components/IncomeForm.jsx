import { useState } from "react";

function IncomeForm({ onAddIncome }) {
  const [income, setIncome] = useState({ description: "", amount: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!income.description || !income.amount || !income.date) return;

    // Sending data to backend
    const response = await fetch("http://localhost:3000/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "income",
        description: income.description,
        amount: income.amount,
        date: income.date,
      }),
    });

    const savedIncome = await response.json();
    onAddIncome(savedIncome);
    setIncome({ description: "", amount: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Income</h3>
      <input
        type="text"
        placeholder="Source (e.g. Salary)"
        value={income.description}
        onChange={(e) => setIncome({ ...income, description: e.target.value })}
      />

      <input
        type="number"
        placeholder="Amount"
        value={income.amount}
        onChange={(e) => setIncome({ ...income, amount: e.target.value })}
      />

      <input
        type="date"
        value={income.date}
        onChange={(e) => setIncome({ ...income, date: e.target.value })}
      />
      <button type="submit">Add Income</button>
    </form>
  );
}
export default IncomeForm;
