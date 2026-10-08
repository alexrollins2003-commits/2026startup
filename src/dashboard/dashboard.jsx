import React from 'react';
import { NavLink } from 'react-router-dom';
import './dashboard.css';

const spendingByCategory = [
  { category: 'Housing', amount: '$1,100' },
  { category: 'Food', amount: '$420' },
  { category: 'Transportation', amount: '$210' },
  { category: 'Fun and extras', amount: '$130' },
];

export function Dashboard() {
  return (
    <main className="page-shell d-grid gap-3">
      <h2 className="dashboard-heading">Your money, in view.</h2>
      <p>Welcome back.</p>

      <section className="dashboard-overview">
        <h2>Monthly summary</h2>
        <div className="dashboard-summary-grid">
          <div className="dashboard-summary-item">
            <span>Monthly income</span>
            <strong>$3,920</strong>
          </div>
          <div className="dashboard-summary-item">
            <span>Available this month</span>
            <strong>$1,240</strong>
          </div>
          <div className="dashboard-summary-item">
            <span>Spent so far</span>
            <strong>$1,860</strong>
          </div>
          <div className="dashboard-summary-item">
            <span>Savings progress</span>
            <strong>$4,280</strong>
          </div>
        </div>
      </section>

      <section>
        <h2>Spending by category</h2>
        <NavLink className="dashboard-action-link" to="/budget">Add expense</NavLink>
        <table>
          <thead><tr><th scope="col">Category</th><th scope="col">This month</th></tr></thead>
          <tbody>
            {spendingByCategory.map(({ category, amount }) => (
              <tr key={category}><td>{category}</td><td>{amount}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Live updates</h2>
        <ul>
          <li>Example User reached 60% of the weekend trip goal.</li>
        </ul>
      </section>
    </main>
  );
}