import React from 'react';
import { getAllRequests, deleteRequest } from './services';
import {
  Header, AsideNav, RequestList, NewRequestForm, Profile
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
      user: JSON.parse(localStorage.getItem('user')),
      requests: [],
      pending: [],
      approved: [],
      rejected: [],
      resolved: [],
      showAllRequests: [],
      showForm: false,
      updateReq: false,
      currentReq: {},
      currentIndex: '',
      currentPage: '',
    };
    this.refreshRequests = this.refreshRequests.bind(this);
    this.showReqForm = this.showReqForm.bind(this);
    this.filterRequests = this.filterRequests.bind(this);
    this.editRequest = this.editRequest.bind(this);
    this.showRequest = this.showRequest.bind(this);
    this.deleteReq = this.deleteReq.bind(this);
  }

  filterRequests(cName) {
    if (cName === 'profile' || cName === 'message') {
      this.setState({ currentPage: cName });
      return;
    }
    this.setState({
      showAllRequests: this.state[cName],
      currentPage: '',
    });
  }

  showReqForm() {
    const { showForm } = this.state;
    const htm = document.getElementsByTagName('html')[0];
    htm.style.overflowY = showForm ? 'scroll' : 'hidden';
    this.setState({ showForm: !showForm, updateReq: false });
  }

  componentDidMount() {
    const cName = document.getElementById('active').className;
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

  refreshRequests() {
    const cName = document.getElementById('active').className;
    setTimeout(() => getAllRequests('/user/requests').then((reqs) => {
      const revReq = reqs.reverse();
      this.setState({
        requests: revReq,
        pending: revReq.filter(e => e.status === 'pending'),
        approved: revReq.filter(e => e.status === 'approved'),
        rejected: revReq.filter(e => e.status === 'rejected'),
        resolved: revReq.filter(e => e.status === 'resolved'),
      });
      this.filterRequests(cName);
    }), 1000);
  }

  showRequest(currentIndex) {
    return () => {
      this.setState({
        showOneRequest: !this.state.showOneRequest,
        currentIndex,
      });
    };
  }

  editRequest(id, type, description) {
    return () => {
      this.showReqForm(); // This turns On the show request form....
      this.setState({
        updateReq: true,
        currentReq: { id, type, description },
      });
    };
  }

  deleteReq(id) {
    return () => {
      if (confirm('Are you sure you want to delete this request')) {
        deleteRequest(`/user/requests/${id}`)
          .then((res) => {
            this.props.notification(res.message, res.success); // handles the notification message
          });
        this.refreshRequests(); // This refreshes the requests after the update
      }
    };
  }

  render() {
    const {
      requests, pending, approved, rejected, resolved,
      showAllRequests, showForm, updateReq, currentReq,
      currentIndex, currentPage,
    } = this.state;
    return (
      <div className="container">
        {
          showForm
          && <NewRequestForm // New Request Form Component
            notification={this.props.notification}
            refreshRequests={this.refreshRequests}
            showReqForm={this.showReqForm}
            updateReq={updateReq}
            currentReq={currentReq}
          />
        }

        <main className="contents">
          <Header // Header Component
            showReqForm={this.showReqForm}
          />
          <div className="content">
            <AsideNav // Left Navigation Component
              requestsL={requests.length}
              pendingL={pending.length}
              approvedL={approved.length}
              rejectedL={rejected.length}
              resolvedL={resolved.length}
              filterRequests={this.filterRequests}
            />
            {
              (currentPage === 'profile')
                ? <Profile />
                : (currentPage === 'message') ? <div>Message from clients</div>
                  : <div id="main-content">
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
                        { !requests.length
                          ? <img
                            src="/images/loader.svg"
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              width: '40px',
                              transform: 'translate(-50%, -50%)',
                            }}
                          />
                          : <RequestList /* requests Components */
                            requests={ showAllRequests }
                            editReq={ this.editRequest }
                            showRequest={ this.showRequest }
                            deleteReq={ this.deleteReq }
                            currentIndex={ currentIndex }
                          />
                        }
                      </div>
                    </div>
                  </div>
            }
          </div>
        </main>
      </div>
    );
  }
}


export default UserPage;
