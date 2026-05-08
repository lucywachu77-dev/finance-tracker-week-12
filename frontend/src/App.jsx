import { useEffect, useState } from "react";
import TransactionForm from "./components/TransactionForm";

function App() {
  // =====================
  // STATE
  // =====================
  const [transactions, setTransactions] = useState([]);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  // =====================
  // ADD TRANSACTION
  // =====================
  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      ...prev,
      { ...transaction, id: Date.now() }
    ]);
  };

  // =====================
  // DELETE TRANSACTION
  // =====================
  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((t) => t.id !== id)
    );
  };

  // =====================
  // CALCULATIONS
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
  // STYLES
  // =====================
  const containerStyle = {
    padding: "20px",
    maxWidth: "500px",
    margin: "auto",
    fontFamily: "Arial",
  };

  const buttonStyle = {
    marginLeft: "10px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  };

  const incomeStyle = { color: "green" };
  const expenseStyle = { color: "red" };

  // =====================
  // UI
  // =====================
  return (
    <div style={containerStyle}>
      <h1>Finance Tracker 💰</h1>

      {/* FORM */}
      <TransactionForm addTransaction={addTransaction} />

      {/* SUMMARY */}
      <div style={{ marginTop: "20px" }}>
        <h3>Summary</h3>
        <p style={incomeStyle}>Income: Ksh {income}</p>
        <p style={expenseStyle}>Expense: Ksh {expense}</p>
        <h2>Balance: Ksh {balance}</h2>
      </div>

      {/* TRANSACTIONS */}
      <div style={{ marginTop: "20px" }}>
        <h3>Transaction History</h3>

        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul style={{ padding: 0 }}>
            {transactions.map((t) => (
              <li
                key={t.id}
                style={{
                  listStyle: "none",
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  color: t.type === "income" ? "green" : "red",
                }}
              >
                <strong>{t.description}</strong> - Ksh {t.amount} ({t.type})

                <button
                  style={buttonStyle}
                  onClick={() => deleteTransaction(t.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;