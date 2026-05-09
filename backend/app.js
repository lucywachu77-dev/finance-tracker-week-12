const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let transactions = [];

app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

app.get('/', (req, res) => {
  res.send('Finance Tracker API is running 🚀');
});

app.post('/api/transactions', (req, res) => {
  const newItem = {
    id: Date.now(),
    ...req.body
  };

  transactions.push(newItem);
  res.status(201).json(newItem);
});

app.delete('/api/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  transactions = transactions.filter(t => t.id !== id);
  res.json({ message: "Deleted" });
});

module.exports = app;