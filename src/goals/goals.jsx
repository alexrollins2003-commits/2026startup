import React from 'react';
import './goals.css';


export function Goals() {
  return (
    <main className="page-shell d-grid gap-3">
      <h2>Make future plans feel closer.</h2>
      <p>Here are your goals.</p>

      <section>
        <h2>Total saved</h2>
        <p className="goal-total">$4,280</p>
        <p>This total will update month by month as new savings are recorded.</p>
        {/* <!-- Database placeholder: the total will eventually be calculated from the user's savings records. --> */}
      </section>

    <section>
        <h2>Active goals</h2>
        <div className="goal-list">
            <div className="goal-item">
            <strong>Weekend trip</strong>
            <p>$720 saved of $1,200</p>
            <div className="progress-bar"><span style={{ width: '60%' }}></span></div>
            </div>
            <div className="goal-item">
            <strong>Emergency fund</strong>
            <p>$3,100 saved of $6,000</p>
            <div className="progress-bar"><span style={{ width: '52%' }}></span></div>
            </div>
            <div className="goal-item">
            <strong>New laptop</strong>
            <p>$460 saved of $1,800</p>
            <div className="progress-bar"><span style={{ width: '26%' }}></span></div>
            </div>
        </div>
    </section>

      <section>
        <h2>Record monthly savings</h2>
        <form action="#" method="post">
          <label for="monthly-savings">Amount saved this month</label>
          <input id="monthly-savings" name="monthly-savings" type="number" placeholder="160" />
          <button type="submit">Save contribution</button>
        </form>
      </section>

      <section>
        <h2>New goal</h2>
        <form action="#" method="post">
          <label for="goal-name">Goal name</label>
          <input id="goal-name" name="goal-name" type="text" placeholder="Summer trip" />
          <label for="goal-amount">Target amount</label>
          <input id="goal-amount" name="goal-amount" type="number" placeholder="1200" />
          <button type="submit">Save goal</button>
        </form>
      </section>

      <section>
        <h2>Monthly savings history</h2>
        <figure>
          <svg width="500" height="300" viewBox="0 0 500 300" role="img" aria-labelledby="savings-chart-title savings-chart-description">
            <title id="savings-chart-title">Monthly savings line graph</title>
            <desc id="savings-chart-description">Savings contributions were 240 dollars in July, 400 dollars in August, and 160 dollars in September.</desc>
            <line x1="70" y1="30" x2="70" y2="240" stroke="#153d5b" />
            <line x1="70" y1="240" x2="460" y2="240" stroke="#153d5b" />
            <polyline points="110,150 260,90 410,180" fill="none" stroke="#1d5b8a" stroke-width="4" />
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
        {/* <!-- Database placeholder: monthly savings history will be loaded from saved records. --> */}
      </section>

      <section>
        <h2>Currency conversion</h2>
        <p>Third-party API placeholder: Frankfurter will provide current exchange rates.</p>
        <p>Example: 1,200 USD is approximately 1,080 EUR.</p>
      </section>

      <section>
        {/* <!-- Database data placeholder: savings goals above represent records stored for the logged-in user. --> */}
        <p>Database preview: three savings goal records are currently displayed.</p>
      </section>
    </main>
  );
}