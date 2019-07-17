import React from 'react';

class AsideNav extends React.Component {
  constructor(props) {
    super(props);
    this.controller = this.controller.bind(this);
  }

  controller(liTag, iTag) {
    return () => {
      const initTag = document.querySelectorAll('#nav .fas')[0];
      initTag.className = initTag.className.replace('fas ', 'far ');
      iTag.className = iTag.className.replace('far ', 'fas ');

      document.getElementById('active').id = '';
      liTag.id = 'active';
      this.props.filterRequests(liTag.className);
    };
  }

  componentDidMount() {
    const navItems = document.querySelectorAll('#aside-nav #nav ul li');
    const icons = document.querySelectorAll('#aside-nav #nav ul li div i');
    for (let i = 0; i < navItems.length; i++) {
      navItems[i].onclick = this.controller(navItems[i], icons[i]);
    }
  }

  render() {
    return (
      <div id="aside-nav">
        <div id="nav">
          <ul>
            <li className='profile'>
              <div className="icons">
                <i className="far fa-user"></i>
                <span>Profile</span>
              </div>
            </li>
            <li id='active' className="requests">
              <div className="icons">
                <i className="fas fa-address-book"></i>
                <span>All Requests</span>
              </div>
              <div className="data">{this.props.requestsL}</div>
            </li>
            <li className="pending">
              <div className="icons">
                <i className="far fa-hourglass"></i>
                <span>Pending Requests</span>
              </div>
              <span className="data">{this.props.pendingL}</span>
            </li>
            <li className="approved">
              <div className="icons">
                <i className="far fa-thumbs-up"></i>
                <span>Approved Requests</span>
              </div>
              <span className="data">{this.props.approvedL}</span>
            </li>
            <li className="rejected">
              <div className="icons">
                <i className="far fa-window-close"></i>
                <span>Rejected Requests</span>
              </div>
              <span className="data">{this.props.rejectedL}</span>
            </li>
            <li className="resolved">
              <div className="icons">
                <i className="far fa-calendar-check"></i>
                <span>Resolved Requests</span>
              </div>
              <span className="data">{this.props.resolvedL}</span>
            </li>
            <li className="message">
              <div className="icons">
                <i className="far fa-envelope-open"></i>
                <span>Message Admin</span>
              </div>
              <span className="data"></span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AsideNav;
