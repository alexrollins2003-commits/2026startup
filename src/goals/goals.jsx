import React, { useState } from 'react';
import { SavingsChart } from './SavingsChart';
import { GoalItem } from './GoalItem';
import './goals.css';
import { readUserData, saveUserData } from '../data/userData';

function amountToCents(amount) {
  return Math.round(Number(amount || 0) * 100);
}

function centsToAmount(cents) {
  return (Number(cents || 0) / 100).toFixed(2);
}

function formatCurrency(cents) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(cents || 0) / 100);
}

function createGoalId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

function createGoalDraft() {
  return { name: '', targetAmount: '', savedAmount: '0.00' };
}

function todayAsInputValue() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export function Goals({ userId }) {
  const [userData, setUserData] = useState(() => readUserData(userId));
  const [goalDraft, setGoalDraft] = useState(createGoalDraft);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const totalSavedCents = userData.goals.reduce((total, goal) => total + Number(goal.savedCents || 0), 0);

  function saveGoal(event) {
    event.preventDefault();
    const targetCents = amountToCents(goalDraft.targetAmount);
    const savedCents = amountToCents(goalDraft.savedAmount);
    if (!Number.isSafeInteger(targetCents) || targetCents <= 0) {
      setStatusMessage('Target amount must be at least $0.01.');
      return;
    }
    if (!Number.isSafeInteger(savedCents) || savedCents < 0) {
      setStatusMessage('Saved amount must be zero or more.');
      return;
    }

    const existingGoal = userData.goals.find((goal) => goal.id === editingGoalId);
    const goal = {
      id: editingGoalId ?? createGoalId(),
      name: goalDraft.name.trim(),
      targetCents,
      savedCents,
      contributions: existingGoal?.contributions ?? [],
    };
    const goals = editingGoalId
      ? userData.goals.map((item) => item.id === editingGoalId ? goal : item)
      : [...userData.goals, goal];

    setUserData(saveUserData(userId, { ...userData, goals }));
    setGoalDraft(createGoalDraft());
    setEditingGoalId(null);
    setStatusMessage(editingGoalId ? 'Goal updated.' : 'Goal created.');
  }

  function beginGoalEdit(goal) {
    setEditingGoalId(goal.id);
    setGoalDraft({
      name: goal.name,
      targetAmount: centsToAmount(goal.targetCents),
      savedAmount: centsToAmount(goal.savedCents),
    });
    setStatusMessage('');
  }

  function cancelGoalEdit() {
    setEditingGoalId(null);
    setGoalDraft(createGoalDraft());
    setStatusMessage('Edit canceled.');
  }

  function addContribution(event, goal) {
    event.preventDefault();
    const amount = new FormData(event.currentTarget).get('contribution');
    const amountCents = amountToCents(amount);
    if (!Number.isSafeInteger(amountCents) || amountCents <= 0) return;

    const contribution = {
      id: createGoalId(),
      amountCents,
      date: todayAsInputValue(),
    };
    const goals = userData.goals.map((item) => item.id === goal.id
      ? {
        ...item,
        savedCents: Number(item.savedCents || 0) + amountCents,
        contributions: [...(Array.isArray(item.contributions) ? item.contributions : []), contribution],
      }
      : item);

    setUserData(saveUserData(userId, { ...userData, goals }));
    event.currentTarget.reset();
    setStatusMessage(`${goal.name} contribution saved.`);
  }

  function deleteGoal(goal) {
    if (!window.confirm(`Delete the ${goal.name} goal?`)) return;

    const goals = userData.goals.filter((item) => item.id !== goal.id);
    setUserData(saveUserData(userId, { ...userData, goals }));
    if (editingGoalId === goal.id) {
      setEditingGoalId(null);
      setGoalDraft(createGoalDraft());
    }
    setStatusMessage('Goal deleted.');
  }

  return (
    <main className="page-shell goals-page d-grid gap-3">
      <h2>Make future plans feel closer.</h2>
      <p>Track what you are saving for.</p>

      <section>
        <h2>Total saved</h2>
        <p className="goal-total">{formatCurrency(totalSavedCents)}</p>
        <p>Across {userData.goals.length} {userData.goals.length === 1 ? 'goal' : 'goals'}.</p>
      </section>

      <section>
        <h2>Active goals</h2>
        <div className="goal-list">
          {userData.goals.length ? userData.goals.map((goal) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              onEdit={beginGoalEdit}
              onDelete={deleteGoal}
              onAddContribution={addContribution}
            />
          )) : <p>No savings goals yet.</p>}
        </div>
      </section>

      <section>
        <h2>{editingGoalId ? 'Edit goal' : 'New goal'}</h2>
        <form className="goal-editor" onSubmit={saveGoal}>
          <label htmlFor="goal-name">Goal name</label>
          <input
            id="goal-name"
            name="goal-name"
            type="text"
            placeholder="Summer trip"
            value={goalDraft.name}
            onChange={(event) => setGoalDraft({ ...goalDraft, name: event.target.value })}
            required
          />
          <label htmlFor="goal-target">Target amount</label>
          <input
            id="goal-target"
            name="goal-target"
            type="number"
            min="0.01"
            step="0.01"
            value={goalDraft.targetAmount}
            onChange={(event) => setGoalDraft({ ...goalDraft, targetAmount: event.target.value })}
            required
          />
          <label htmlFor="goal-saved">Saved so far</label>
          <input
            id="goal-saved"
            name="goal-saved"
            type="number"
            min="0"
            step="0.01"
            value={goalDraft.savedAmount}
            onChange={(event) => setGoalDraft({ ...goalDraft, savedAmount: event.target.value })}
            required
          />
          <div className="goal-editor-actions">
            <button type="submit">{editingGoalId ? 'Save changes' : 'Create goal'}</button>
            {editingGoalId && <button type="button" className="goal-cancel" onClick={cancelGoalEdit}>Cancel</button>}
          </div>
        </form>
      </section>

      <section>
        <h2>Monthly savings history</h2>
        <SavingsChart goals={userData.goals} />
      </section>

      {statusMessage && <p className="goal-status" role="status" aria-live="polite">{statusMessage}</p>}

      <section>
        <h2>Currency conversion</h2>
        <p>Third-party API placeholder: Frankfurter will provide current exchange rates.</p>
        <p>Example: 1,200 USD is approximately 1,080 EUR.</p>
      </section>
    </main>
  );
}