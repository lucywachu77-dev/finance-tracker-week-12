function IncomeList({ transactions }) {
  const incomes = transactions.filter(
    (transaction) => transaction.type === "income",
  );

  return (
    <div>
      <h3> Income Transactions</h3>
      {incomes.length === 0 ? (
        <p>No income recorded yet.</p>
      ) : (
        <ul>
          {incomes.map((income) => (
            <li key={income.id}>
              {income.description} - KES {income.amount} on {income.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IncomeList;
