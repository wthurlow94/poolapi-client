import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {({ isAuth }) => (
      <Route
        render={props =>
          isAuth ? <Component {...props} /> : <Redirect to="/login" />
        }
        {...rest}
      />
    )}
  </AuthContext.Consumer>
)

export default AuthenticatedRoute