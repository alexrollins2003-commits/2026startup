import React from 'react';
import { NavLink } from 'react-router-dom';
import './dashboard.css';

export function Dashboard() {
  return (
    <main className="page-shell d-grid gap-3">
      <h2 className="dashboard-heading">Your money, in view.</h2>
      <p>Welcome back.</p>
      <div className="auth-window" id="auth-window" popover="auto">
        <div className="auth-window-heading">
          <h2>Sign in</h2>
          <button className="auth-close" type="button" popoverTarget="auth-window" popoverTargetAction="hide">Close</button>
        </div>
        <form className="login-card" action="#" method="post">
          <label htmlFor="user-name">Name</label>
          <input id="user-name" name="user-name" type="text" placeholder="Enter your name" autoComplete="name" required />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" required />
          <button type="submit">Log in</button>
        </form>
        <details className="create-account">
          <summary>New here? Create an account</summary>
          <form action="#" method="post">
            <label htmlFor="new-user-name">Name</label>
            <input id="new-user-name" name="new-user-name" type="text" autoComplete="name" required />
            <label htmlFor="new-user-email">Email</label>
            <input id="new-user-email" name="new-user-email" type="email" autoComplete="email" required />
            <label htmlFor="new-user-password">Password</label>
            <input id="new-user-password" name="new-user-password" type="password" autoComplete="new-password" minLength="8" required />
            <button type="submit">Create account</button>
          </form>
        </details>
      </div>

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
            <tr><td>Housing</td><td>$1,100</td></tr>
            <tr><td>Food</td><td>$420</td></tr>
            <tr><td>Transportation</td><td>$210</td></tr>
            <tr><td>Fun and extras</td><td>$130</td></tr>
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