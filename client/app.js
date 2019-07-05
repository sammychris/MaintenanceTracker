import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserPage from './pages/UserPage';
import './styling.scss';

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
        <Route path="/auth/signin" component={SignUp} />
        <Route path="/auth/signup" component={SignIn} />
        <Route path="/dashboard" component={UserPage} />
      </Switch>
    );
  }
}

export default App;
