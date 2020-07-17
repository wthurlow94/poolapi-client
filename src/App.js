import React from 'react';
import './css/App.css';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Matches from './components/Matches'
import Logout from './components/Logout'
import { AuthProvider, AuthContext, AuthConsumer } from './context/AuthContext'
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';




function App() {
  return (
    <AuthProvider>
      
      <div className="App">
        <Router>
          <AuthConsumer>
            {({ isAuth }) => (
              <nav>
                <ul>
                  {isAuth ? '' :(
                  <li>
                    <Link to="/">Register</Link>
                  </li>
                  )}
                  {isAuth ? (
                    <li>
                      <Link to='/matches'>Matches</Link>
                    </li>
                  ) : ''
                  }
                  {isAuth ? (
                    <li>
                      <Link to="/logout">Logout</Link>
                    </li>
                  ) : (
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    )}

                </ul>
              </nav>
            )}
          </AuthConsumer>

          <Switch>
            <UnauthenticatedRoute exact path="/" component={Register}/>
             

            <UnauthenticatedRoute path="/login" component={Login} />
            


            <AuthenticatedRoute path="/matches" component={Matches}/>
           


            <AuthenticatedRoute path="/logout" component={Logout}/>
              

            {/* <Route path="/matches">
              <h1>matches</h1>
            </Route> */}
            {/* <Route path="/logout">
              <AuthConsumer>
                {({ isAuth, login, logout }) => (
                  <form onSubmit={logout}>
                    <button>logout</button>
                  </form>
                )}
              </AuthConsumer> */}
            {/* </Route> */}
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
