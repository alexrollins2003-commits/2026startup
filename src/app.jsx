import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Dashboard } from './dashboard/dashboard';
import { Budget } from './budget/budget';
import { Goals } from './goals/goals';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
      <div className="body">
        <header className="site-header">
          <h1>Spend Horizon</h1>
          <img src="/horizon.svg" alt="A sunset over a distant horizon" width="400" />
          <nav className="site-nav" aria-label="Primary navigation">
            <ul>
              <li><NavLink to="/">Dashboard</NavLink></li>
              <li><NavLink to="/budget">Budget</NavLink></li>
              <li><NavLink to="/goals">Goals</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
            </ul>
            <button className="auth-trigger" type="button" popoverTarget="auth-window" popoverTargetAction="show">
              Sign in
            </button>
          </nav>
        </header>

        <div className="auth-window" id="auth-window" popover="auto">
          <div className="auth-window-heading">
            <h2>Sign in</h2>
            <button className="auth-close" type="button" popoverTarget="auth-window" popoverTargetAction="hide">Close</button>
          </div>
          <form className="login-card" action="#" method="post">
            <label htmlFor="user-name">Name</label>
            <input id="user-name" name="user-name" type="text" placeholder="Enter your name" autoComplete="name" required />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" required />
            <button type="submit">Log in</button>
          </form>
          <details className="create-account">
            <summary>New here? Create an account</summary>
            <form action="#" method="post">
              <label htmlFor="new-user-name">Name</label>
              <input id="new-user-name" name="new-user-name" type="text" autoComplete="name" required />
              <label htmlFor="new-user-email">Email</label>
              <input id="new-user-email" name="new-user-email" type="email" autoComplete="email" required />
              <label htmlFor="new-user-password">Password</label>
              <input id="new-user-password" name="new-user-password" type="password" autoComplete="new-password" minLength="8" required />
              <button type="submit">Create account</button>
            </form>
          </details>
        </div>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>
          <p>Spend Horizon &copy; 2026</p>
          <p>Alex Rollins</p>
          <p>GitHub repository: <a href="https://github.com/alexrollins2003-commits/2026startup">GitHub Link</a></p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}