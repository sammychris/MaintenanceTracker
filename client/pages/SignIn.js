import React from 'react';
import { LogIn } from './services';


class SignIn extends React.Component {
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
    this.setState({ error: 'email is required' })
    const { email, password } = this.state;
    LogIn(this.props.match.url, { email, password })
      .then((res) => {
        console.log(res);
        this.setState({
          token: res.token,
          message: res.message,
        });
        this.loggedIn();
      });
  }

  loggedIn() {
    const { message, token } = this.state;
    if (token) {
      this.props.history.push('/user/dashboard');
    }
    alert(message);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email
            <input type="text" value={this.state.email} name="email" onChange={this.handleChange}/>
            {this.state.email || this.state.error}
          </label>
          <label>
            Create Password
            <input type="text" value={this.state.password} name="password" onChange={this.handleChange}/>
          </label>
          <label >
            <button type="submit"> Submit</button>
          </label>
        </form>
      </div>
    );
  }
}

export default SignIn;
