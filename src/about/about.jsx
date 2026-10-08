import React from 'react';
import './about.css';


export function About() {
  return (
    <main className="page-shell about-page d-grid gap-3">
      <h2>About</h2>
      <p>Learn how Spend Horizon helps you plan smarter and spend with purpose.</p>

      <section>
        <h2>Our mission</h2>
        <p>Spend Horizon was created to help people take control of their money without feeling overwhelmed by spreadsheets or complicated budgeting tools. We believe financial planning should be simple, clear, and encouraging.</p>
      </section>

      <section>
        <h2>Who it is for</h2>
        <p>Whether you are a student managing a tight budget, a young professional building savings, or a household planning for future expenses, Spend Horizon makes it easier to understand where your money is going and where you want it to go next.</p>
      </section>

      <section>
        <h2>How it works</h2>
        <ul class="feature-list">
          <li>Track your income and monthly expenses in one place.</li>
          <li>Organize spending by category to see patterns and trends.</li>
          <li>Create savings goals and estimate how long they will take to reach.</li>
          <li>Review progress over time and adjust habits with confidence.</li>
        </ul>
      </section>

      <section>
        <h2>Why it matters</h2>
        <p>Budgeting is easier when you can see the full picture. Spend Horizon helps users plan for upcoming purchases, reduce stress, and build better long-term financial habits through clear insight and consistent progress tracking.</p>
      </section>

    </main>
  );
}