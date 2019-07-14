import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container">
      <header className="header">
        <div className="logo-section">Logo</div>
        <div className="nav-section">
          <nav>
            <span>
              <Link to="/auth/login">login</Link>
            </span>
            <span>
              <Link to="/auth/signup">signup</Link>
            </span>
          </nav>
        </div>
      </header>
      <main className="contents">
        <h1>This is where you can come and make your request</h1>
      </main>
      <footer>
        <h2>Make sure you dont forget to register</h2>
      </footer>
    </div>
  );
};

export default HomePage;
