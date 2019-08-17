import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import User from './pages/User';
import { PrivateRoute, PublicRoute, PopUpMessage } from './pages/components';
// import './styling.scss';
// import './stylesheet/style.css';
// import './stylesheet/w3.css';
import './stylesheet/App.scss';
import './fonts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      message: '',
      display: false,
    };
    this.notification = this.notification.bind(this);
  }

  notification(message, success) {
    this.setState({
      display: true,
      message,
      success,
    });
    setTimeout(() => {
      this.setState({
        display: false,
      });
    }, 3000);
  }

  render() {
  // <PrivateRoute path={/\/user(\/dashboard|\/profile|\/messages)?/} Component={User} notification={this.notification}/>
    const { display, message, success } = this.state;
    return (
      <div>
        { display && <PopUpMessage message={ message } success={ success }/> }
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PublicRoute path="/auth/login" Component={LogIn} notification={this.notification}/>
          <PublicRoute path="/auth/signup" Component={SignUp} notification={this.notification}/>
          <PrivateRoute path="/user/dashboard" Component={User} notification={this.notification}/>
          <PrivateRoute path="/user/profile" Component={User} notification={this.notification}/>
          <PrivateRoute path="/user/messages" Component={User} notification={this.notification}/>
        </Switch>
      </div>
    );
  }
}

export default App;
