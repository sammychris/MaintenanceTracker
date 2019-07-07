import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// export const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     localStorage.getItem('user')
//       ? <Component {...props} />
//       : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//   )} />
// );


const PrivateRoute = (props) => {
  return (localStorage.getItem('user'))
    ? (<Route path={props.path} component={props.component} />)
    : (<Redirect to='/'/>);
};


const PublicRoute = (props) => {
  return !(localStorage.getItem('user'))
    ? (<Route path={props.path} component={props.component} />)
    : (<Redirect to='/user/dashboard'/>);
};

export {
  PrivateRoute,
  PublicRoute,
};
