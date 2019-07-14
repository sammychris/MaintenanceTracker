import React from 'react';
import { Link } from 'react-router-dom';
import { getAllRequests, logOut } from './services';
import { Header, AsideNav, RequestList } from './components';


class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      requests: [],
    };
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem('user')),
    });
    getAllRequests('/user/requests').then((reqs) => {
      console.log(reqs);
      this.setState({ requests: reqs });
    });
  }

  render() {
    return (
      <div className="container">
        <Header /> { /* Header Components */ }
        <main className="contents">
          <div className="content">
            <AsideNav /> { /* Left Navigation Components */ }
            <div id="main-content">
              <div>navigations</div>
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
                  <RequestList requests={this.state.requests} /> { /* requests Components */ }
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <h2>Make sure you dont forget to register</h2>
          <Link to="/"><button onClick={logOut}>logout</button></Link>
        </footer>
      </div>
    );
  }
}


export default UserPage;
