import React from 'react';
import { Link } from 'react-router-dom';
import { signUp } from './services';
// import PostApi from './middleware/PostApi';


// const styling = {
//   border: '2px solid red',
// };


class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      cpassword: '',
      submit: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // validateForm() {
  //   const { name, email, password, cpassword } = this.state;
  //   return name.length > 0 && email.length > 0 && password.length > 0;
  // }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      name, email, password, cpassword,
    } = this.state;
    signUp(this.props.match.url, { name, email, password })
      .then((data) => {
        if (data.success) {
          this.props.history.push('/auth/login');
          alert('You can now Login');
        }
      });
  }

  render() {
    return (
      <div id="form-holder">
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
                required
              />
            </div>
          </label>
          <label>
            <div>Confirm Password</div>
            <div>
              <input
                type="password"
                value={this.state.cpassword}
                name="cpassword"
                onChange={this.handleChange}
                required
              />
            </div>
          </label>
          <button type="submit"> Submit</button>
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
