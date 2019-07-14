import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = (props) => {
  return (localStorage.getItem('user'))
    ? (<Route path={props.path} component={props.component} />)
    : (<Redirect to='/' />);
};

export default PrivateRoute;
