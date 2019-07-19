import React from 'react';
import { getAllRequests } from './services';
import {
  Header, AsideNav, RequestList, NewRequestForm,
} from './components';

const SearchTag = () => {
  return (
    <div id="search">
      <div id="box">
        <span>Type:</span>
        <span className="item">Repair</span>
        <span className="item">Maintenance</span>
      </div>
    </div>
  );
};


class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      requests: [],
      pending: [],
      approved: [],
      rejected: [],
      resolved: [],
      showRequests: [],
      newReq: false,
    };
    this.makeNewReq = this.makeNewReq.bind(this);
    this.newBtnReq = this.newBtnReq.bind(this);
    this.filterRequests = this.filterRequests.bind(this);
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem('user')),
    });
    getAllRequests('/user/requests').then((reqs) => {
      const revReq = reqs.reverse();
      this.setState({
        requests: revReq,
        pending: revReq.filter(e => e.status === 'pending'),
        approved: revReq.filter(e => e.status === 'approved'),
        rejected: revReq.filter(e => e.status === 'rejected'),
        resolved: revReq.filter(e => e.status === 'resolved'),
        showRequests: revReq,
      });
    });
  }

  filterRequests(cName) {
    if (cName === 'profile' || cName === 'message') return;
    this.setState({ showRequests: this.state[cName] });
  }

  newBtnReq() {
    const { newReq } = this.state;
    const htm = document.getElementsByTagName('html')[0];
    htm.style.overflowY = newReq ? 'scroll' : 'hidden';
    this.setState({ newReq: !newReq });
  }

  makeNewReq() {
    const cName = document.getElementById('active').className;
    this.newBtnReq();

    getAllRequests('/user/requests').then((reqs) => {
      const revReq = reqs.reverse();
      this.setState({
        requests: revReq,
        pending: revReq.filter(e => e.status === 'pending'),
        approved: revReq.filter(e => e.status === 'approved'),
        rejected: revReq.filter(e => e.status === 'rejected'),
        resolved: revReq.filter(e => e.status === 'resolved'),
      });
      this.filterRequests(cName);
    });
  }

  render() {
    const {
      requests, pending, approved, rejected, resolved, showRequests,
    } = this.state;

    return (
      <div className="container">
        {
          this.state.newReq
          && <NewRequestForm // New Request Form Component
            makeNewReq={this.makeNewReq}
            newBtnReq={this.newBtnReq}
          />
        }
        <Header // Header Component
          newBtnReq={this.newBtnReq}
        />
        <main className="contents">
          <div className="content">
            <AsideNav // Left Navigation Component
              requestsL={requests.length}
              pendingL={pending.length}
              approvedL={approved.length}
              rejectedL={rejected.length}
              resolvedL={resolved.length}
              filterRequests={this.filterRequests}
            />
            <div id="main-content">
              <SearchTag />
              <div id="requests">
                <div id="req-header" className="list">
                  <div className="date">
                    <i className="fas fa-calendar"></i>
                    Date
                  </div>
                  <div className="desc">
                    <i className="fas fa-info-circle"></i>
                    Description
                  </div>
                  <div className="reqid">
                    <i className="fas fa-passport"></i>
                    Req Id
                  </div>
                  <div className="status">
                    <i className="fas fa-map-marker-alt"></i>
                    Status
                  </div>
                </div>
                <div id="req-content">
                  <RequestList requests={ showRequests } /> { /* requests Components */ }
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}


export default UserPage;
