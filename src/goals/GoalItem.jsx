import React from 'react';

function formatCurrency(cents) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(cents || 0) / 100);
}

export function GoalItem({ goal, onEdit, onDelete, onAddContribution }) {
  const targetCents = Number(goal.targetCents || 0);
  const savedCents = Number(goal.savedCents || 0);
  const progress = targetCents > 0 ? Math.min(100, (savedCents / targetCents) * 100) : 0;

  return (
    <article className="goal-item">
      <div className="goal-item-heading">
        <div>
          <h3>{goal.name}</h3>
          <p>{formatCurrency(savedCents)} saved of {formatCurrency(targetCents)}</p>
        </div>
        <div className="goal-actions">
          <button type="button" onClick={() => onEdit(goal)}>Edit</button>
          <button type="button" className="goal-delete" onClick={() => onDelete(goal)}>Delete</button>
        </div>
      </div>
      <div
        className="progress-bar"
        role="progressbar"
        aria-label={`${goal.name} savings progress`}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(progress)}
      >
        <span style={{ width: `${progress}%` }} />
      </div>
      <p className="goal-progress-label">{Math.round(progress)}% complete</p>
      <form className="goal-contribution-form" onSubmit={(event) => onAddContribution(event, goal)}>
        <label htmlFor={`contribution-${goal.id}`}>Add contribution</label>
        <div>
          <input
            id={`contribution-${goal.id}`}
            name="contribution"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            required
          />
          <button type="submit">Add</button>
        </div>
      </form>
    </article>
  );
}