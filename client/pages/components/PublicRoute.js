import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = (props) => {
  return !(localStorage.getItem('user'))
    ? (<Route path={props.path} component={props.component} />)
    : (<Redirect to='/user/dashboard'/>);
};

export default PublicRoute;
