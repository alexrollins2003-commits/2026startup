import React, { useState } from 'react';
import './budget.css';
import { budgetCategories, readUserData, saveUserData } from '../data/userData';

function centsToAmount(cents) {
  return (cents / 100).toFixed(2);
}

function amountToCents(amount) {
  return Math.round(Number(amount || 0) * 100);
}

function todayAsInputValue() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function createExpenseDraft() {
  return {
    description: '',
    amount: '',
    category: budgetCategories[0],
    date: todayAsInputValue(),
  };
}

function formatCurrency(cents) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

function formatExpenseDate(date) {
  const parsedDate = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsedDate.getTime()) ? date : parsedDate.toLocaleDateString();
}

export function Budget({ userId }) {
  const [savedData, setSavedData] = useState(() => readUserData(userId));
  const [income, setIncome] = useState(() => ({
    primaryPaycheck: centsToAmount(savedData.monthlyIncomeCents.primaryPaycheck),
    otherIncome: centsToAmount(savedData.monthlyIncomeCents.otherIncome),
  }));
  const [categoryBudgets, setCategoryBudgets] = useState(() => Object.fromEntries(
    budgetCategories.map((category) => [
      category,
      centsToAmount(savedData.categoryBudgetsCents[category]),
    ]),
  ));
  const [statusMessage, setStatusMessage] = useState('');
  const [expenseDraft, setExpenseDraft] = useState(createExpenseDraft);
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  function saveIncome(event) {
    event.preventDefault();
    const nextData = {
      ...savedData,
      monthlyIncomeCents: {
        primaryPaycheck: amountToCents(income.primaryPaycheck),
        otherIncome: amountToCents(income.otherIncome),
      },
    };
    setSavedData(saveUserData(userId, nextData));
    setStatusMessage('Income saved.');
  }

  function saveCategoryBudgets(event) {
    event.preventDefault();
    const nextData = {
      ...savedData,
      categoryBudgetsCents: Object.fromEntries(
        budgetCategories.map((category) => [category, amountToCents(categoryBudgets[category])]),
      ),
    };
    setSavedData(saveUserData(userId, nextData));
    setStatusMessage('Category limits saved.');
  }

  function saveExpense(event) {
    event.preventDefault();
    const id = editingExpenseId ?? globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    const expense = {
      id,
      description: expenseDraft.description.trim(),
      amountCents: amountToCents(expenseDraft.amount),
      category: expenseDraft.category,
      date: expenseDraft.date,
    };
    const expenses = editingExpenseId
      ? savedData.expenses.map((item) => item.id === editingExpenseId ? expense : item)
      : [expense, ...savedData.expenses];
    const nextData = saveUserData(userId, { ...savedData, expenses });

    setSavedData(nextData);
    setExpenseDraft(createExpenseDraft());
    setEditingExpenseId(null);
    setStatusMessage(editingExpenseId ? 'Expense updated.' : 'Expense saved.');
  }

  function editExpense(expense) {
    setEditingExpenseId(expense.id);
    setExpenseDraft({
      description: expense.description,
      amount: centsToAmount(expense.amountCents),
      category: expense.category,
      date: expense.date,
    });
    setStatusMessage('');
  }

  function cancelExpenseEdit() {
    setEditingExpenseId(null);
    setExpenseDraft(createExpenseDraft());
    setStatusMessage('Edit canceled.');
  }

  function deleteExpense(expenseId) {
    if (!window.confirm('Delete this expense?')) return;

    const nextData = saveUserData(userId, {
      ...savedData,
      expenses: savedData.expenses.filter((expense) => expense.id !== expenseId),
    });
    setSavedData(nextData);
    if (editingExpenseId === expenseId) cancelExpenseEdit();
    setStatusMessage('Expense deleted.');
  }

  return (
    <main className="page-shell budget-page d-grid gap-3">
      <h2>Build a budget that breathes.</h2>
      <p>Here's your plan.</p>

      <div className="budget-layout">
        <section>
          <h2>Income</h2>
          <form onSubmit={saveIncome}>
            <label htmlFor="paycheck">Primary paycheck</label>
            <input
              id="paycheck"
              name="paycheck"
              type="number"
              min="0"
              step="0.01"
              value={income.primaryPaycheck}
              onChange={(event) => setIncome({ ...income, primaryPaycheck: event.target.value })}
              required
            />
            <label htmlFor="other-income">Other income</label>
            <input
              id="other-income"
              name="other-income"
              type="number"
              min="0"
              step="0.01"
              value={income.otherIncome}
              onChange={(event) => setIncome({ ...income, otherIncome: event.target.value })}
              required
            />
            <button type="submit">Save income</button>
          </form>
        </section>

        <section>
          <h2>Category limits</h2>
          <form onSubmit={saveCategoryBudgets}>
            <div className="category-budget-fields">
              {budgetCategories.map((category) => {
                const fieldId = `budget-${category.toLowerCase()}`;
                return (
                  <div key={category}>
                    <label htmlFor={fieldId}>{category}</label>
                    <input
                      id={fieldId}
                      name={fieldId}
                      type="number"
                      min="0"
                      step="0.01"
                      value={categoryBudgets[category]}
                      onChange={(event) => setCategoryBudgets({
                        ...categoryBudgets,
                        [category]: event.target.value,
                      })}
                      required
                    />
                  </div>
                );
              })}
            </div>
            <button type="submit">Save category limits</button>
          </form>
        </section>

        <section>
          <h2>Expenses</h2>
          <form className="expense-form" onSubmit={saveExpense}>
            <label htmlFor="expense-name">Description</label>
            <input
              id="expense-name"
              name="expense-name"
              type="text"
              placeholder="Groceries"
              value={expenseDraft.description}
              onChange={(event) => setExpenseDraft({ ...expenseDraft, description: event.target.value })}
              required
            />
            <label htmlFor="expense-category">Expense category</label>
            <select
              id="expense-category"
              name="expense-category"
              value={expenseDraft.category}
              onChange={(event) => setExpenseDraft({ ...expenseDraft, category: event.target.value })}
            >
              {budgetCategories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
            <label htmlFor="expense-amount">Amount</label>
            <input
              id="expense-amount"
              name="expense-amount"
              type="number"
              min="0.01"
              step="0.01"
              value={expenseDraft.amount}
              onChange={(event) => setExpenseDraft({ ...expenseDraft, amount: event.target.value })}
              required
            />
            <label htmlFor="expense-date">Date</label>
            <input
              id="expense-date"
              name="expense-date"
              type="date"
              value={expenseDraft.date}
              onChange={(event) => setExpenseDraft({ ...expenseDraft, date: event.target.value })}
              required
            />
            <div className="expense-form-actions">
              <button type="submit">{editingExpenseId ? 'Update expense' : 'Save expense'}</button>
              {editingExpenseId && <button type="button" className="secondary-action" onClick={cancelExpenseEdit}>Cancel</button>}
            </div>
          </form>
          <div className="expense-table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col"><span className="visually-hidden">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {savedData.expenses.length ? savedData.expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                    <td>{formatExpenseDate(expense.date)}</td>
                    <td>{formatCurrency(expense.amountCents)}</td>
                    <td className="expense-actions">
                      <button type="button" onClick={() => editExpense(expense)}>Edit</button>
                      <button type="button" className="delete-action" onClick={() => deleteExpense(expense.id)}>Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="5">No expenses recorded yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {statusMessage && <p className="save-message" role="status" aria-live="polite">{statusMessage}</p>}

      <section className="suggestion-box">
        <h2>Suggestions</h2>
        <p><strong>Tip:</strong> A future service call will review category totals and suggest a way to save.</p>
        <p>Example response: cutting flexible dining by $35 would move your goal forward by 5 days.</p>
        <p>Third-party service placeholder: <code>fetch('/api/suggestions?month=2026-09')</code></p>
      </section>
    </main>
  );
}