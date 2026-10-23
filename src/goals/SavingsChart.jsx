import React from 'react';

function lastSixMonths() {
  const now = new Date();
  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return {
      key: `${date.getFullYear()}-${month}`,
      label: date.toLocaleDateString('en-US', { month: 'short' }),
    };
  });
}

function formatCurrency(cents) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cents / 100);
}

export function SavingsChart({ goals }) {
  const months = lastSixMonths();
  const totals = months.map((month) => goals.reduce((total, goal) => {
    const contributions = Array.isArray(goal.contributions) ? goal.contributions : [];
    return total + contributions.reduce((monthTotal, contribution) => (
      contribution.date?.startsWith(month.key) ? monthTotal + Number(contribution.amountCents || 0) : monthTotal
    ), 0);
  }, 0));

  if (totals.every((total) => total === 0)) {
    return <p>No contributions recorded in the last six months.</p>;
  }

  const maximum = Math.max(...totals);
  const points = totals.map((total, index) => ({
    x: 56 + index * 96,
    y: 28 + ((maximum - total) / maximum) * 140,
  }));

  return (
    <figure className="savings-chart">
      <svg viewBox="0 0 600 220" role="img" aria-labelledby="savings-chart-title savings-chart-description">
        <title id="savings-chart-title">Monthly savings contributions</title>
        <desc id="savings-chart-description">
          Contributions over the last six months: {months.map((month, index) => `${month.label} ${formatCurrency(totals[index])}`).join(', ')}.
        </desc>
        <line x1="40" y1="180" x2="560" y2="180" className="chart-axis" />
        <polyline points={points.map((point) => `${point.x},${point.y}`).join(' ')} className="chart-line" />
        {points.map((point, index) => (
          <g key={months[index].key}>
            <circle cx={point.x} cy={point.y} r="5" className="chart-point" />
            <text x={point.x} y="202" textAnchor="middle">{months[index].label}</text>
            {totals[index] > 0 && <text x={point.x} y={point.y - 10} textAnchor="middle">{formatCurrency(totals[index])}</text>}
          </g>
        ))}
      </svg>
      <figcaption>Recorded contributions across all goals.</figcaption>
    </figure>
  );
}