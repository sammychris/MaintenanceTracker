import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import UserPage from './pages/UserPage';
import { PrivateRoute, PublicRoute, PopUpMessage } from './pages/components';
import './styling.scss';
// import './stylesheet/style.css';
// import './stylesheet/w3.css';
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
    }, 5000);
  }

  render() {
    const { display, message, success } = this.state;
    return (
      <div>
        { display && <PopUpMessage message={ message } success={ success }/> }
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PublicRoute path="/auth/login" Component={LogIn} notification={this.notification}/>
          <PublicRoute path="/auth/signup" Component={SignUp} notification={this.notification}/>
          <PrivateRoute path="/user/dashboard" Component={UserPage} notification={this.notification}/>
        </Switch>
      </div>
    );
  }
}

export default App;
