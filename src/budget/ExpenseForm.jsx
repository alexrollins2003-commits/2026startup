import React from 'react';

export function ExpenseForm({ categories, draft, editing, onDraftChange, onSubmit, onCancel }) {
  return (
    <form className="expense-form" onSubmit={onSubmit}>
      <label htmlFor="expense-name">Description</label>
      <input
        id="expense-name"
        name="expense-name"
        type="text"
        placeholder="Groceries"
        value={draft.description}
        onChange={(event) => onDraftChange('description', event.target.value)}
        required
      />
      <label htmlFor="expense-category">Expense category</label>
      <select
        id="expense-category"
        name="expense-category"
        value={draft.category}
        onChange={(event) => onDraftChange('category', event.target.value)}
      >
        {categories.map((category) => <option key={category} value={category}>{category}</option>)}
      </select>
      <label htmlFor="expense-amount">Amount</label>
      <input
        id="expense-amount"
        name="expense-amount"
        type="number"
        min="0.01"
        step="0.01"
        value={draft.amount}
        onChange={(event) => onDraftChange('amount', event.target.value)}
        required
      />
      <label htmlFor="expense-date">Date</label>
      <input
        id="expense-date"
        name="expense-date"
        type="date"
        value={draft.date}
        onChange={(event) => onDraftChange('date', event.target.value)}
        required
      />
      <div className="expense-form-actions">
        <button type="submit">{editing ? 'Update expense' : 'Save expense'}</button>
        {editing && <button type="button" className="secondary-action" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}