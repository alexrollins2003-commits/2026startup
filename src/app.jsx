import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Dashboard } from './dashboard/dashboard';
import { Budget } from './budget/budget';
import { Goals } from './goals/goals';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

function AppLayout() {
  const location = useLocation();
  const isDashboard = location.pathname === '/';

  return (
    <div className={`body${isDashboard ? ' dashboard-route' : ''}`}>
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
        {isDashboard && (
          <button className="auth-trigger" type="button" popoverTarget="auth-window" popoverTargetAction="show">
            Sign in
          </button>
        )}
      </nav>
    </header>

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
  );
}

function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}