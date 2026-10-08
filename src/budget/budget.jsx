import React from 'react';
import './budget.css';


export function Budget() {
  return (
    <main className="page-shell d-grid gap-3">
      <h2>Build a budget that breathes.</h2>
      <p>Here's your plan.</p>

      <div className="budget-layout">
        <section>
          <h2>Income</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="paycheck">Primary paycheck</label>
            <input id="paycheck" name="paycheck" type="number" defaultValue="3600" />
            <label htmlFor="other-income">Other income</label>
            <input id="other-income" name="other-income" type="number" defaultValue="320" />
            <button type="submit">Save income</button>
          </form>
        </section>

        <section>
          <h2>Expenses</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="expense-name">Expense name</label>
            <input id="expense-name" name="expense-name" type="text" placeholder="Rent" />
            <label htmlFor="expense-category">Expense category</label>
            <input id="expense-category" name="expense-category" type="text" list="category-options" placeholder="Enter Category" />
            <datalist id="category-options">
              <option value="Housing"></option>
              <option value="Food"></option>
              <option value="Bills"></option>
              <option value="Transportation"></option>
              <option value="Entertainment"></option>
            </datalist>
            <label htmlFor="expense-amount">Expense amount</label>
            <input id="expense-amount" name="expense-amount" type="number" min="0" step="0.01" placeholder="1100" />
            <button type="submit">Save expense</button>
          </form>
          <table>
            <thead><tr><th scope="col">Expense</th><th scope="col">Category</th><th scope="col">Due</th><th scope="col">Amount</th></tr></thead>
            <tbody>
              <tr><td>Apartment rent</td><td>Housing</td><td>1st</td><td>$1,100</td></tr>
              <tr><td>Electric bill</td><td>Bills</td><td>12th</td><td>$86</td></tr>
              <tr><td>Grocery plan</td><td>Food</td><td>Weekly</td><td>$420</td></tr>
              <tr><td>Transit pass</td><td>Transportation</td><td>1st</td><td>$120</td></tr>
            </tbody>
          </table>
          {/* <!-- Database data placeholder: saved expense rows will be loaded from the database. --> */}
          <p>Database preview: four saved expense records are displayed above.</p>
        </section>
      </div>

      <section className="suggestion-box">
        <h2>Suggestions</h2>
        <p><strong>Tip:</strong> A future service call will review category totals and suggest a way to save.</p>
        <p>Example response: cutting flexible dining by $35 would move your goal forward by 5 days.</p>
        <p>Third-party service placeholder: <code>fetch('/api/suggestions?month=2026-09')</code></p>
      </section>
    </main>
  );
}