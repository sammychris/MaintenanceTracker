import React from 'react';
import { Link } from 'react-router-dom';
import { GetAllRequests, LogOut } from './services';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      requests: [],
      login: '',
    };
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem('user')),
    });
    GetAllRequests('/user/requests').then(reqs => console.log(reqs));
  }

  render() {
    return (
      <div>
        <h1>Welcome come mr {this.state.user.name}</h1>
        <Link to="/"><button onClick={LogOut}>logout</button></Link>
      </div>
    );
  }
}


export default UserPage;
