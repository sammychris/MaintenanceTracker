import React from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../services';

const Header = (props) => {
  return (
    <header className="header">
      <div className="logo-section">
        <div id="logo">
          <i className="fab fa-affiliatetheme"></i>
        </div>
        <h3>Maintenance Tracker</h3>
      </div>
      <div className="nav-section">
        <div id="notification" className="header-nav">
          <i className="far fa-bell"></i>
          <p>Notification</p>
        </div>
        <div id="new-req" onClick={props.newBtnReq} className="header-nav">
          <i className="fas fa-plus"></i>
          <p>New Request</p>
        </div>
        <Link to="/">
          <div id="logOut" className="header-nav" onClick={logOut}>
            <i className="fas fa-sign-out-alt"></i>
            <p>Logout</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
