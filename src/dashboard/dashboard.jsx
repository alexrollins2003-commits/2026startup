import React from 'react';

export function Dashboard() {
  return (
<main class="page-shell d-grid gap-3">
      <h2 class="dashboard-heading">Your money, in view.</h2>
      <p>Welcome back.</p>
      <div class="auth-window" id="auth-window" popover>
        <div class="auth-window-heading">
          <h2>Sign in</h2>
          <button class="auth-close" type="button" popovertarget="auth-window" popovertargetaction="hide">Close</button>
        </div>
        <form class="login-card" action="#" method="post">
          <label for="user-name">Name</label>
          <input id="user-name" name="user-name" type="text" placeholder="Enter your name" autocomplete="name" required />
          <label for="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Enter your password" autocomplete="current-password" required />
          <button type="submit">Log in</button>
        </form>
        <details class="create-account">
          <summary>New here? Create an account</summary>
          <form action="#" method="post">
            <label for="new-user-name">Name</label>
            <input id="new-user-name" name="new-user-name" type="text" autocomplete="name" required />
            <label for="new-user-email">Email</label>
            <input id="new-user-email" name="new-user-email" type="email" autocomplete="email" required />
            <label for="new-user-password">Password</label>
            <input id="new-user-password" name="new-user-password" type="password" autocomplete="new-password" minlength="8" required />
            <button type="submit">Create account</button>
          </form>
        </details>
      </div>

      <section class="dashboard-overview">
        <h2>Monthly summary</h2>
        <div class="dashboard-summary-grid">
          <div class="dashboard-summary-item">
            <span>Monthly income</span>
            <strong>$3,920</strong>
          </div>
          <div class="dashboard-summary-item">
            <span>Available this month</span>
            <strong>$1,240</strong>
          </div>
          <div class="dashboard-summary-item">
            <span>Spent so far</span>
            <strong>$1,860</strong>
          </div>
          <div class="dashboard-summary-item">
            <span>Savings progress</span>
            <strong>$4,280</strong>
          </div>
        </div>
      </section>

      <section>
        <h2>Spending by category</h2>
        <a class="dashboard-action-link" href="budget.html">Add expense</a>
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