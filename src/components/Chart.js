import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28',
  '#FF8042', '#D93636', '#AA336A',
  '#339999', '#8A2BE2'
];

const CategoryChart = ({ transactions }) => {
  const categoryMap = {};

  transactions.forEach(({ category, amount }) => {
    if (amount === 0) return; // skip zero values
    const type = amount > 0 ? 'Income' : 'Expense';
    const key = `${category} (${type})`;
    const absAmount = Math.abs(amount);

    if (!categoryMap[key]) {
      categoryMap[key] = { name: key, value: absAmount };
    } else {
      categoryMap[key].value += absAmount;
    }
  });

  const data = Object.values(categoryMap);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Exclude items with 0 value and attach percentage
  const dataWithPercent = data
    .filter(item => item.value > 0)
    .map(item => ({
      ...item,
      percent: ((item.value / total) * 100).toFixed(1)
    }));

  if (dataWithPercent.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>No transactions to display in chart.</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '30px auto' }}>
      <h3 style={{ textAlign: 'center' }}>Category-wise Income & Expense</h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={dataWithPercent}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label={({ name, percent }) => `${name}: ${percent}%`}
          >
            {dataWithPercent.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value}`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
