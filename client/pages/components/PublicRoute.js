import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = (props) => {
  const { Component, notification, path } = props;
  return !(localStorage.getItem('user'))
    ? (<Route render={ () => <Component notification={notification} path={path} />} />)
    : (<Redirect to='/user/dashboard'/>);
};

export default PublicRoute;
