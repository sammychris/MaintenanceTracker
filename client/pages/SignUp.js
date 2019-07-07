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
    this.props.history.push(`/dashboard`);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input type="text" value={this.state.name} name="name" onChange={this.handleChange}/>
          </label>
          <label>
            Email
            <input type="text" value={this.state.email} name="email" onChange={this.handleChange}/>
          </label>
          <label>
            Create Password
            <input type="text" value={this.state.password} name="password" onChange={this.handleChange}/>
          </label>
          <label >
            <button type="submit" disabled={!this.validateForm()}> Submit</button>
          </label>
        </form>
          <div>
          <button onClick={this.redirectToTarget}>Redirect</button>
         </div>
      </div>
    );
  }
}


export default SignUp;
