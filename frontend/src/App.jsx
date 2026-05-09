import { useEffect, useState } from "react";
import IncomeForm from "./components/IncomeForm";
import IncomeList from "./components/IncomeList";

function App() {
  const [transactions, setTransactions] = useState([]);

  // ✅ Fetch existing transactions from backend
  useEffect(() => {
    fetch("http://localhost:3000/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // ✅ Add new transaction (income or expense)
  const addTransaction = async (transaction) => {
    try {
      const response = await fetch("http://localhost:3000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });

      const saved = await response.json();

      setTransactions((prev) => [...prev, saved]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  // ✅ Calculate totals
  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenseTotal = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = incomeTotal - expenseTotal;

  return (
    <div className="app">
      <h1>💰 Finance Tracker</h1>

      {/* BALANCE */}
      <div className="summary">
        <h2>Your Balance: KES {balance}</h2>
        <p>Income: KES {incomeTotal}</p>
        <p>Expenses: KES {expenseTotal}</p>
      </div>

      {/* FORM */}
      <IncomeForm onAddIncome={addTransaction} />

      {/* LIST */}
      <IncomeList transactions={transactions} />
    </div>
  );
}

export default App;
