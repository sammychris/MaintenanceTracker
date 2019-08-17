import React from 'react';
import { Redirect } from 'react-router-dom';
import { getAllRequests, deleteRequest } from './services';
import UserProfile from './UserProfile';
import UserMessages from './UserMessages';
import UserRequests from './UserRequests';
import { Header, AsideNav, NewRequestForm } from './components';

const ManageComponents = (props) => {
  const valid = url => new RegExp(`user/${url}/?$`).test(location.href);

  if (valid('profile')) {
    return (
      <UserProfile
        user={ props.user }
      />
      );
  }

  if (valid('messages')) {
    return (<UserMessages />);
  }

  return (
    <UserRequests
      loading={ props.loading }
      requests={ props.requests }
      editReq={ props.editReq }
      showRequest={ props.showRequest }
      deleteReq={ props.deleteReq }
      currentIndex={ props.currentIndex }
    />
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
      loading: false,
    };
    this.refreshRequests = this.refreshRequests.bind(this);
    this.showReqForm = this.showReqForm.bind(this);
    this.filterRequests = this.filterRequests.bind(this);
    this.editRequest = this.editRequest.bind(this);
    this.showRequest = this.showRequest.bind(this);
    this.deleteReq = this.deleteReq.bind(this);
  }

  filterRequests(cName) {
    if (cName === 'profile') return this.setState({ currentPage: cName });
    if (cName === 'message') return this.setState({ currentPage: 'messages' });
    return this.setState({
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
        loading: true,
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
      currentIndex, currentPage, loading, user,
    } = this.state;
    return (
      <div className="container">
        {
          currentPage === 'profile'
            ? <Redirect to='/user/profile' />
            : currentPage === 'messages'
              ? <Redirect to='/user/messages' />
              : <Redirect to='/user/dashboard' />
        }
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
            <ManageComponents
              user= { user }
              loading={ loading }
              requests={ showAllRequests }
              editReq={ this.editRequest }
              showRequest={ this.showRequest }
              deleteReq={ this.deleteReq }
              currentIndex={ currentIndex }
            />
          </div>
        </main>
      </div>
    );
  }
}


export default UserPage;
