import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signUp } from './services';


class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      submit: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submit: true });
    const { name, email, password } = this.state;
    signUp(this.props.path, { name, email, password })
      .then((res) => {
        this.setState({ submit: false });
        if (res.success) {
          this.handleRedirect();
          this.props.notification(res.message, res.success);
        } else {
          this.setState({ redirect: false });
          this.props.notification(res.message, res.success);
        }
      });
  }

  handleRedirect() {
    setTimeout(() => this.setState({ redirect: true }), 4000);
    setTimeout(() => {
      return this.props.notification('You may now login...', true);
    }, 6000);
  }

  render() {
    const { submit, redirect } = this.state;
    return (
      <div id="form-holder">
        { redirect && <Redirect to='/auth/login' /> }
        <h1>Sign Up</h1>
        <p style={{ fontSize: '18px' }}>All fields are required</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            <div>Name</div>
            <div>
              <input
                type="text"
                value={this.state.name}
                name="name"
                onChange={this.handleChange}
                placeholder="Eg: Samuel Okanume"
                required
              />
            </div>
          </label>
          <label>
            <div>Email</div>
            <div>
              <input
                type="email"
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
                placeholder="Eg: example@gmail.com"
                required
              />
            </div>
          </label>
          <label>
            <div>Create Password</div>
            <div>
              <input
                type="password"
                value={this.state.password}
                name="password"
                onChange={this.handleChange}
                placeholder="Eg: password232kjks"
                required
              />
            </div>
          </label>
          <div style={{ position: 'relative' }}>
            <button type="submit">{submit ? 'Signing up' : 'Submit' }</button>
            { submit && <img src="/images/loader.svg"
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
          Have an account?
          <Link to="/auth/login">
            <span style={{ color: '#3782A3', fontWeight: 'bold' }}> Log in</span>
          </Link>
        </p>
      </div>
    );
  }
}


export default SignUp;
