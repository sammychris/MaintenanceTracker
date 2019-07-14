import React from 'react';

class AsideNav extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div id="aside-nav">
        <div id="user-prof">
          <h3>Hi Samuel</h3>
          <div id="user-img"></div>
        </div>
        <div id="nav">
          <ul>
            <li><span>All Requests</span> <span className="data">75</span></li>
            <li>Pending Rquests</li>
            <li>Approved Requests</li>
            <li>Rejected Requests</li>
            <li>Resolved Requests</li>
          </ul>
        </div>
        <div id="chat">
          <h3>Chat Admin</h3>
          <p>you can chat with our Admin, in case you’re having an issues.</p>
        </div>
      </div>
    );
  }
}

export default AsideNav;
