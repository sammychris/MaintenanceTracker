import React from 'react';
import { Link } from 'react-router-dom';
import { logIn } from './services';


class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirect: false,
      message: '',
      token: '',
      login: false,
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    logIn(this.props.match.url, { email, password })
      .then((res) => {
        this.setState({
          token: res.token,
          message: res.message,
        });
        this.loggedIn();
      });
  }

  loggedIn() {
    const { token } = this.state;
    if (token) {
      this.props.history.push('/user/dashboard');
    }
  }

  render() {
    return (
      <div id="form-holder">
        <h1>Log In</h1>
        <p style={{ fontSize: '18px' }}>All fields are required</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            <div>Email</div>
            <div>
              <input type="email" value={this.state.email} name="email" onChange={this.handleChange}/>
            </div>
          </label>
          <label>
            <div>Password</div>
            <div>
              <input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
            </div>
          </label>
          <button type="submit">Submit</button>
        </form>
        <p style={{ fontSize: '16px' }}>
          Don't have an account?
          <Link to="/auth/signup">
            <span style={{ color: '#3782A3', fontWeight: 'bold' }}> Sign Up</span>
          </Link>
        </p>
      </div>
    );
  }
}

export default LogIn;
