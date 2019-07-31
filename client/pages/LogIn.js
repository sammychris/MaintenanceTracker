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
      token: '',
      login: false,
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
    this.setState({ login: true });
    const { email, password } = this.state;
    logIn(this.props.path, { email, password })
      .then((res) => {
        this.setState({
          token: res.token,
        });
        this.props.notification(res.message, res.success);
        this.loggedIn();
      });
  }

  loggedIn() {
    const { token } = this.state;
    if (token) {
      this.props.history.push('/user/dashboard');
    } else {
      this.setState({ login: false });
    }
  }

  render() {
    const { email, password, login } = this.state;
    return (
      <div id="form-holder">
        <h1>Log In</h1>
        <p style={{ fontSize: '18px' }}>All fields are required</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            <div>Email</div>
            <div>
              <input type="email" value={ email } name="email" onChange={this.handleChange}/>
            </div>
          </label>
          <label>
            <div>Password</div>
            <div>
              <input type="password" value={ password } name="password" onChange={this.handleChange}/>
            </div>
          </label>
          <div style={{ position: 'relative' }}>
            <button type="submit">{login ? 'Logging in' : 'Submit' }</button>
            { login && <img src="/images/loader.svg"
              style={{
                position: 'absolute',
                top: '20%',
                left: '65%',
                width: '30px',
              }}
            /> }
          </div>
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
