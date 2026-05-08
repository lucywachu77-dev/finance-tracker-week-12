import { useEffect, useState } from "react";
import TransactionForm from "./components/TransactionForm";

function App() {
  const [transactions, setTransactions] = useState([]);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      ...prev,
      { ...transaction, id: Date.now() }
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((t) => t.id !== id)
    );
  };

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

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Finance Tracker 💰</h1>

      <TransactionForm addTransaction={addTransaction} />

      <h3>Summary</h3>
      <p>Income: Ksh {income}</p>
      <p>Expense: Ksh {expense}</p>
      <h2>Balance: Ksh {balance}</h2>

      <h3>Transactions</h3>

      {transactions.map((t) => (
        <div key={t.id} style={{ marginBottom: "10px" }}>
          <strong>{t.description}</strong> - Ksh {t.amount} ({t.type})

          <button onClick={() => deleteTransaction(t.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;