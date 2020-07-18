import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const UnauthenticatedRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {({ isAuth }) => (
      <Route
        render={props =>
          isAuth ? <Redirect to="/matches"/> : <Component {...props} /> 
        }
        {...rest}
      />
    )}
  </AuthContext.Consumer>
)

export default UnauthenticatedRoute