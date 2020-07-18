import React from 'react';
import './css/App.css';
import { HashRouter as Router, Switch } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Matches from './components/Matches'
import CreateMatch from './components/CreateMatch'
import Logout from './components/Logout'
import { AuthProvider, AuthConsumer } from './context/AuthContext'
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import AuthenticatedHeader from './components/AuthenticatedHeader';
import UnauthenticatedHeader from './components/UnauthenticatedHeader';
import Splash from './components/Splash'
import Match from './components/Match'
import {Navbar} from 'react-bootstrap'



function App() {
  return (
    <AuthProvider>
      
      <div className="App">
        <Router>
          <AuthConsumer>
            {({ isAuth }) => (
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="/">Pool.io</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                  {isAuth ? 
                  (<AuthenticatedHeader />) : (
                    <UnauthenticatedHeader />
                  )}

              </Navbar.Collapse>
              </Navbar>
            )}
          </AuthConsumer>

          <Switch>
            <UnauthenticatedRoute exact path="/" component={Splash} />
            <UnauthenticatedRoute path="/register" component={Register} />
            <UnauthenticatedRoute path="/login" component={Login} />
            <AuthenticatedRoute exact path="/matches" component={Matches} />
            <AuthenticatedRoute path="/newmatch" component={CreateMatch} />
            <AuthenticatedRoute path="/matches/:_id" component={Match} />
            <AuthenticatedRoute path="/logout" component={Logout} />
          </Switch>
        </Router>
      </div>
    </AuthProvider>

  );

}

export default App;


/*
 * This should have two kinds of protected routes:
 * One for when we want to redirect when logged in (e.g. login page)
 * One for when we want to redirect when not logged in (logout page)
 * Two kinds of protected Route:
 * Authenticated Route that only appear when authenticated - Matches, Logout
 * Unauthenticated Route - Register, login
 * Normal Route (home)
 */



/**
 * {isAuth ? (
 *    <AuthenticatedNavBar>
 *
 *
 * )
 * : (
 *    <UnauthenticatedNavbar>
 *
 * )}
 *
 */
