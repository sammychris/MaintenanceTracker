import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import UserPage from './pages/UserPage';
import { PrivateRoute, PublicRoute } from './pages/components';
import './styling.scss';
// import './stylesheet/style.css';
// import './stylesheet/w3.css';
import './fonts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sign: false,
      users: false,
    };
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <PublicRoute path="/auth/login" component={LogIn} />
        <PublicRoute path="/auth/signup" component={SignUp} />
        <PrivateRoute path="/user/dashboard" component={UserPage} />
      </Switch>
    );
  }
}

export default App;
