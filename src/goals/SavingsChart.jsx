import React from 'react';

export function SavingsChart() {
  return (
    <figure>
      <svg width="500" height="300" viewBox="0 0 500 300" role="img" aria-labelledby="savings-chart-title savings-chart-description">
        <title id="savings-chart-title">Monthly savings line graph</title>
        <desc id="savings-chart-description">Savings contributions were 240 dollars in July, 400 dollars in August, and 160 dollars in September.</desc>
        <line x1="70" y1="30" x2="70" y2="240" stroke="#153d5b" />
        <line x1="70" y1="240" x2="460" y2="240" stroke="#153d5b" />
        <polyline points="110,150 260,90 410,180" fill="none" stroke="#1d5b8a" strokeWidth="4" />
        <circle cx="110" cy="150" r="6" fill="#f4b35f" />
        <circle cx="260" cy="90" r="6" fill="#f4b35f" />
        <circle cx="410" cy="180" r="6" fill="#f4b35f" />
        <text x="92" y="265">July</text>
        <text x="238" y="265">August</text>
        <text x="382" y="265">September</text>
        <text x="12" y="155">$240</text>
        <text x="12" y="95">$400</text>
        <text x="12" y="185">$160</text>
      </svg>
      <figcaption>Monthly savings contribution placeholder.</figcaption>
    </figure>
  );
}