import React from 'react';
// import PostApi from './middleware/PostApi';


class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   PostApi('/auth/signin', {
  //     name: 'samuel',
  //     email: 'ebusamer@gmail.com',
  //     password: '1232nm334',
  //   }).then((a) => {
  //     this.setState({
  //       page: a.message,
  //     });
  //   });
  // }

  validateForm() {
    const { name, email, password } = this.state;
    return name.length > 0 && email.length > 0 && password.length > 0;
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  // setRedirect = () => {
  //   this.setState({
  //     redirect: true
  //   })
  // }

  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to='/' />
  //   }
  // }

  redirectToTarget() {
    console.log(this.props.history);
    console.log(this.props)
    this.props.history.push(`user/dashboard`);
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
              />
            </div>
          </label>
          <label>
            <div>Email</div>
            <div>
              <input type="email" value={this.state.email} name="email" onChange={this.handleChange}/>
            </div>
          </label>
          <label>
            <div>Create Password</div>
            <div>
              <input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
            </div>
          </label>
          <label>
            <div>Confirm Password</div>
            <div>
              <input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
            </div>
          </label>
          <button type="submit" disabled={!this.validateForm()}> Submit</button>
        </form>
        <p style={{ fontSize: '16px' }}>Have an account? <span style={{ color: '#3782A3', fontWeight: 'bold' }}>Log in</span></p>
      </div>
    );
  }
}


export default SignUp;
