import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Dashboard } from './dashboard/dashboard';
// import your other page components here

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
      </nav>
    </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* one Route per page */}
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