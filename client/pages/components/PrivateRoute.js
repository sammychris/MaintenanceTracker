import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { Component, path, notification } = props;
  return (localStorage.getItem('user'))
    ? (<Route render={ () => <Component path={path} notification={notification} /> } />)
    : (<Redirect to='/' />);
};

export default PrivateRoute;
