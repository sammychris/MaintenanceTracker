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

  filterRequests(tagName) {
    if (tagName === 'profile' || tagName === 'message') return;
    this.setState({ showRequests: this.state[tagName] });
  }

  makeNewReq() {
    const { newReq } = this.state;
    const htm = document.getElementsByTagName('html')[0];
    htm.style.overflowY = newReq ? 'scroll' : 'hidden';
    this.setState({ newReq: !newReq });

    getAllRequests('/user/requests').then((reqs) => {
      const revReq = reqs.reverse();
      this.setState({
        requests: revReq,
        pending: revReq.filter(e => e.status === 'pending'),
        approved: revReq.filter(e => e.status === 'approved'),
        rejected: revReq.filter(e => e.status === 'rejected'),
        resolved: revReq.filter(e => e.status === 'resolved'),
      });
    });
  }

  render() {
    const {
      requests, pending, approved, rejected, resolved, showRequests,
    } = this.state;

    return (
      <div className="container">
        {this.state.newReq && <NewRequestForm makeNewReq={this.makeNewReq} />}
        <Header // Header Components
          makeNewReq={this.makeNewReq}
        />
        <main className="contents">
          <div className="content">
            <AsideNav // Left Navigation Components
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
                  <div className="date">Date</div>
                  <div className="desc">Description</div>
                  <div className="reqid">Req Id</div>
                  <div className="status">Status</div>
                </div>
                <div id="req-content">
                  <div className="reqs">
                    <div className="date">10/20/2019</div>
                    <div className="desc">My site is shutting down for the ...</div>
                    <div className="reqid">405839</div>
                    <div className="status">
                      <div className="text">Pending</div>
                      <div className="time">Still in review</div>
                      <div className="options">
                        <div className="edit">Edit</div>
                        <div className="del">Delete</div>
                      </div>
                    </div>
                  </div>
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
