import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from '../context/AuthContext'

const UnauthenticatedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuth }) => (
      <Route
        render={props =>
          isAuth ? <Redirect to="/matches"/> : <Component {...props} /> 
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default UnauthenticatedRoute