import { useState } from "react";

function TransactionForm({ addTransaction }) {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!type || !description || !amount || !date) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      type,
      description,
      amount: Number(amount),
      date,
    };

    addTransaction(newTransaction);

    // clear form
    setType("");
    setDescription("");
    setAmount("");
    setDate("");
  };

  return (
    <div className="form-section">
      <h3>Add Transaction</h3>

      <form onSubmit={handleSubmit}>
        {/* TYPE */}
        <div className="form-control">
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <div className="form-control">
          <label>Description</label>
          <input
            type="text"
            placeholder="e.g. Salary, Food, Rent"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* AMOUNT */}
        <div className="form-control">
          <label>Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* DATE */}
        <div className="form-control">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-add">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
