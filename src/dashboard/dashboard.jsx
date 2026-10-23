import React from 'react';
import { NavLink } from 'react-router-dom';
import './dashboard.css';
import { budgetCategories, readUserData } from '../data/userData';

const mockLiveUpdates = [
  'Example User reached 60% of the weekend trip goal.',
];

function formatCurrency(cents) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

function currentMonthKey() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
}

export function Dashboard({ displayName, userId }) {
  const userData = readUserData(userId);
  const currentMonth = currentMonthKey();
  const currentExpenses = userData.expenses.filter((expense) => expense.date?.startsWith(currentMonth));
  const spentByCategory = Object.fromEntries(budgetCategories.map((category) => [
    category,
    currentExpenses
      .filter((expense) => expense.category === category)
      .reduce((total, expense) => total + Number(expense.amountCents || 0), 0),
  ]));
  const spentCents = currentExpenses.reduce((total, expense) => total + Number(expense.amountCents || 0), 0);
  const incomeCents = Object.values(userData.monthlyIncomeCents)
    .reduce((total, amount) => total + Number(amount || 0), 0);
  const availableCents = incomeCents - spentCents;
  const totalSavedCents = userData.goals
    .reduce((total, goal) => total + Number(goal.savedCents || 0), 0);

  return (
    <main className="page-shell d-grid gap-3">
      <h2 className="dashboard-heading">Your money, in view.</h2>
      <p>Welcome back, {displayName}.</p>

      <section className="dashboard-overview">
        <h2>Monthly summary</h2>
        <div className="dashboard-summary-grid">
          <div className="dashboard-summary-item">
            <span>Monthly income</span>
            <strong>{formatCurrency(incomeCents)}</strong>
          </div>
          <div className="dashboard-summary-item">
            <span>Income left after spending</span>
            <strong>{formatCurrency(availableCents)}</strong>
          </div>
          <div className="dashboard-summary-item">
            <span>Spent so far</span>
            <strong>{formatCurrency(spentCents)}</strong>
          </div>
          <div className="dashboard-summary-item">
            <span>Total saved toward goals</span>
            <strong>{formatCurrency(totalSavedCents)}</strong>
          </div>
        </div>
      </section>

      <section>
        <h2>Spending by category</h2>
        <NavLink className="dashboard-action-link" to="/budget">Add expense</NavLink>
        <table>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Spent</th>
              <th scope="col">Limit</th>
              <th scope="col">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {budgetCategories.map((category) => {
              const spent = spentByCategory[category];
              const limit = Number(userData.categoryBudgetsCents[category] || 0);
              const remaining = limit - spent;
              return (
                <tr key={category}>
                  <td>{category}</td>
                  <td>{formatCurrency(spent)}</td>
                  <td>{limit > 0 ? formatCurrency(limit) : 'No limit'}</td>
                  <td className={limit > 0 && remaining < 0 ? 'over-budget' : undefined}>
                    {limit > 0 ? formatCurrency(remaining) : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Live updates</h2>
        <ul>
          {mockLiveUpdates.map((update) => <li key={update}>{update}</li>)}
        </ul>
      </section>
    </main>
  );
}