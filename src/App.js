import React, { useState, useEffect } from 'react';
import './App.css';
import CategoryChart from './components/Chart';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const storedData = localStorage.getItem("transactions");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode) setDarkMode(JSON.parse(storedMode));
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addTransaction = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Date.now(),
      text,
      amount: parseFloat(amount),
      category,
    };
    setTransactions([newTransaction, ...transactions]);
    setText('');
    setAmount('');
    setCategory('');
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((item) => item.id !== id);
    setTransactions(updatedTransactions);
  };

  const getBalance = () => {
    return transactions.reduce((acc, item) => acc + item.amount, 0).toFixed(2);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <div className="app-card">
        <div className="header">
          <h2>Expense Tracker PWA</h2>
          <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        <h3 className="balance">Balance: ₹{getBalance()}</h3>

        <form onSubmit={addTransaction} className="form">
          <input
            type="text"
            placeholder="Enter description"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select category</option>
            <option value="Food">🍔 Food</option>
            <option value="Bills">💡 Bills</option>
            <option value="Shopping">🛍️ Shopping</option>
            <option value="Salary">💰 Salary</option>
          </select>
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="add-btn">Add Transaction</button>
        </form>

        <ul className="transaction-list">
          {transactions
            .filter((t) => t.text.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((item) => (
              <li key={item.id} className="transaction-item">
                <span>{item.text} - ₹{item.amount} <em>({item.category})</em></span>
                <button className="delete-btn" onClick={() => deleteTransaction(item.id)}>✖</button>
              </li>
            ))}
        </ul>

        <CategoryChart transactions={transactions} />
      </div>
    </div>
  );
}

export default App;
