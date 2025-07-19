import React from 'react';

const TotalExpense = ({ expenses }) => {
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  return <h2>Total: ₹{total.toFixed(2)}</h2>;
};

export default TotalExpense;
