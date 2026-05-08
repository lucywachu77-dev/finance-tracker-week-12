import IncomeForm from "./components/IncomeForm";
import IncomeList from "./components/IncomeList";
import { useState, useEffect } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {

    // ===============================
// DISPLAY TRANSACTIONS
// ===============================
function displayTransactions() {
  // Clear existing transactions
  transactionList.innerHTML = "";

  // Combine income + expense arrays
  const allTransactions = [
    ...incomeTransactions,
    ...expenseTransactions,
  ];

  // Loop through transactions
  allTransactions.forEach((transaction, index) => {
    const li = document.createElement("li");

    li.classList.add("transaction-item");

    // Different colors for income & expense
    if (transaction.type === "income") {
      li.classList.add("income");
    } else {
      li.classList.add("expense");
    }

    li.innerHTML = `
      <div>
        <strong>${transaction.name}</strong>
        <small>${transaction.type}</small>
      </div>

      <div>
        Ksh ${transaction.amount}
        <button onclick="deleteTransaction(${index}, '${transaction.type}')">
          Delete
        </button>
      </div>
    `;

    transactionList.appendChild(li);
  });

  // Update totals after displaying
  updateBalance();
}

// ===============================
// UPDATE BALANCE
// ===============================
function updateBalance() {
  // Calculate total income
  const totalIncome = incomeTransactions.reduce(
    (total, item) => total + item.amount,
    0
  );

  // Calculate total expense
  const totalExpense = expenseTransactions.reduce(
    (total, item) => total + item.amount,
    0
  );

  // Calculate balance
  const balance = totalIncome - totalExpense;

  // Display values on screen
  incomeEl.textContent = Ksh ${totalIncome};
  expenseEl.textContent = Ksh ${totalExpense};
  balanceEl.textContent = Ksh ${balance};
}

// ===============================
// DELETE TRANSACTION
// ===============================
function deleteTransaction(index, type) {
  if (type === "income") {
    incomeTransactions.splice(index, 1);
  } else {
    expenseTransactions.splice(index, 1);
  }

  // Refresh UI
  displayTransactions();
};
  

  useEffect(() => {
    fetch("http://localhost:3000/api/transactions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        return response.json();
      })
      .then((data) => setTransactions(data))
      .catch((error) =>
        console.error("Error loading transactions:", error)
      );
  }, []);

  return (
    <div>
      <h1>Finance Tracker 💰</h1>
      <IncomeForm onAddIncome={addTransaction} />
      <IncomeList transactions={transactions} />
    </div>
  );
}

export default App;
