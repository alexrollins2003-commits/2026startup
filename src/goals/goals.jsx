import React from 'react';
import { SavingsChart } from './SavingsChart';
import './goals.css';


export function Goals() {
  return (
    <main className="page-shell goals-page d-grid gap-3">
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
          <label htmlFor="monthly-savings">Amount saved this month</label>
          <input id="monthly-savings" name="monthly-savings" type="number" placeholder="160" />
          <button type="submit">Save contribution</button>
        </form>
      </section>

      <section>
        <h2>New goal</h2>
        <form action="#" method="post">
          <label htmlFor="goal-name">Goal name</label>
          <input id="goal-name" name="goal-name" type="text" placeholder="Summer trip" />
          <label htmlFor="goal-amount">Target amount</label>
          <input id="goal-amount" name="goal-amount" type="number" placeholder="1200" />
          <button type="submit">Save goal</button>
        </form>
      </section>

      <section>
        <h2>Monthly savings history</h2>
        <SavingsChart />
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