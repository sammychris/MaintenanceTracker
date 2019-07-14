import React from 'react';
// import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-section">
        <div id="logo">Logo</div>
        <h3>Maintenance Tracker</h3>
      </div>
      <div className="nav-section">
        <div id="notification">
          <p>Notification</p>
        </div>
        <div id="new-req">
          <p>New</p>
        </div>
        <div id="profile">
          <p>Profile</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
