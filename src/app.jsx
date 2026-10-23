import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { Dashboard } from './dashboard/dashboard';
import { Budget } from './budget/budget';
import { Goals } from './goals/goals';
import { About } from './about/about';
import { readUserData, saveUserData } from './data/userData';

const currentUserStorageKey = 'spend-horizon.current-user';

function readCurrentUser() {
  try {
    const user = JSON.parse(localStorage.getItem(currentUserStorageKey) || 'null');
    return user && typeof user.email === 'string' && typeof user.displayName === 'string'
      ? user
      : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(readCurrentUser);
  const [authMessage, setAuthMessage] = useState('');
  const authWindowRef = useRef(null);

  useEffect(() => {
    function syncSession(event) {
      if (event.key === currentUserStorageKey || event.key === null) {
        setCurrentUser(readCurrentUser());
      }
    }

    window.addEventListener('storage', syncSession);
    return () => window.removeEventListener('storage', syncSession);
  }, []);

  function beginSession(email, displayName) {
    const user = { email, displayName };
    localStorage.setItem(currentUserStorageKey, JSON.stringify(user));
    setCurrentUser(user);
    setAuthMessage('');
    authWindowRef.current?.hidePopover();
  }

  function handleSignIn(event) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email').trim().toLowerCase();
    const savedProfile = readUserData(email);

    if (!savedProfile.profileName) {
      setAuthMessage('No local account was found for that email. Create an account below.');
      return;
    }

    beginSession(email, savedProfile.profileName);
  }

  function handleCreateAccount(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const displayName = formData.get('displayName').trim();
    const email = formData.get('email').trim().toLowerCase();
    const savedProfile = readUserData(email);

    if (savedProfile.profileName) {
      setAuthMessage('A local account already uses that email. Sign in instead.');
      return;
    }

    saveUserData(email, { ...savedProfile, profileName: displayName });
    beginSession(email, displayName);
  }

  function handleSignOut() {
    localStorage.removeItem(currentUserStorageKey);
    setCurrentUser(null);
  }

  return (
    <BrowserRouter>
      <div className="body">
        <header className="site-header">
          <h1>Spend Horizon</h1>
          <img src="/horizon.svg" alt="A sunset over a distant horizon" width="400" />
          <nav className="site-nav" aria-label="Primary navigation">
            <ul>
              {currentUser && (
                <>
                  <li><NavLink to="/">Dashboard</NavLink></li>
                  <li><NavLink to="/budget">Budget</NavLink></li>
                  <li><NavLink to="/goals">Goals</NavLink></li>
                </>
              )}
              <li><NavLink to="/about">About</NavLink></li>
            </ul>
            {currentUser ? (
              <button className="auth-trigger" type="button" onClick={handleSignOut}>Sign out</button>
            ) : (
              <button className="auth-trigger" type="button" popoverTarget="auth-window" popoverTargetAction="show">
                Sign in
              </button>
            )}
          </nav>
        </header>

        {!currentUser && (
          <div className="auth-window" id="auth-window" popover="auto" ref={authWindowRef}>
            <div className="auth-window-heading">
              <h2>Sign in</h2>
              <button className="auth-close" type="button" popoverTarget="auth-window" popoverTargetAction="hide">Close</button>
            </div>
            <p className="auth-note">Local demo account. No password is stored.</p>
            <form className="login-card" onSubmit={handleSignIn}>
              <label htmlFor="sign-in-email">Email</label>
              <input id="sign-in-email" name="email" type="email" autoComplete="email" required />
              <button type="submit">Sign in</button>
            </form>
            {authMessage && <p className="auth-message" role="alert">{authMessage}</p>}
            <details className="create-account">
              <summary>New here? Create an account</summary>
              <form onSubmit={handleCreateAccount}>
                <label htmlFor="new-user-name">Name</label>
                <input id="new-user-name" name="displayName" type="text" autoComplete="name" required />
                <label htmlFor="new-user-email">Email</label>
                <input id="new-user-email" name="email" type="email" autoComplete="email" required />
                <button type="submit">Create account</button>
              </form>
            </details>
          </div>
        )}

        <Routes>
          <Route path="/" element={currentUser ? <Dashboard displayName={currentUser.displayName} userId={currentUser.email} /> : <LoginPrompt />} />
          <Route path="/budget" element={currentUser ? <Budget userId={currentUser.email} /> : <Navigate to="/" replace />} />
          <Route path="/goals" element={currentUser ? <Goals userId={currentUser.email} /> : <Navigate to="/" replace />} />
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

function LoginPrompt() {
  return (
    <main className="login-prompt">
      <h2>Welcome to Spend Horizon</h2>
      <p>Sign in to manage your budget, expenses, and savings goals.</p>
      <button className="auth-trigger" type="button" popoverTarget="auth-window" popoverTargetAction="show">
        Sign in or create account
      </button>
    </main>
  );
}

function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}