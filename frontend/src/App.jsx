import { useEffect, useState } from "react";
import TransactionForm from "./components/TransactionForm";

function App() {
  // =====================
  // STATE (Patrick core logic)
  // =====================
  const [transactions, setTransactions] = useState([]);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  // =====================
  // ADD TRANSACTION (from Moureen form)
  // =====================
  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      ...prev,
      { ...transaction, id: Date.now() }
    ]);
  };

  // =====================
  // DELETE TRANSACTION (Patrick logic)
  // =====================
  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((t) => t.id !== id)
    );
  };

  // =====================
  // CALCULATE INCOME / EXPENSE / BALANCE
  // =====================
  useEffect(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    setIncome(totalIncome);
    setExpense(totalExpense);
    setBalance(totalIncome - totalExpense);
  }, [transactions]);

  // =====================
  // UI
  // =====================
  return (
    <div style={{ padding: "20px" }}>
      <h1>Finance Tracker 💰</h1>

      {/* MOUREEN FORM CONNECTED HERE */}
      <TransactionForm addTransaction={addTransaction} />

      {/* SUMMARY */}
      <div style={{ marginTop: "20px" }}>
        <h3>Summary</h3>
        <p>Income: Ksh {income}</p>
        <p>Expense: Ksh {expense}</p>
        <h2>Balance: Ksh {balance}</h2>
      </div>

      {/* TRANSACTIONS LIST */}
      <ul style={{ marginTop: "20px" }}>
        {transactions.map((t) => (
          <li
            key={t.id}
            style={{
              marginBottom: "10px",
              color: t.type === "income" ? "green" : "red"
            }}
          >
            <strong>{t.description}</strong> - Ksh {t.amount} ({t.type})

            <button
              onClick={() => deleteTransaction(t.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;