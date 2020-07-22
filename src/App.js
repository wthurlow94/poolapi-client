import React from 'react';
import './css/App.css';
import { HashRouter as Router, Switch } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Matches from './components/Matches'
import CreateMatch from './components/CreateMatch'
import Logout from './components/Logout'
import { AuthContext } from './context/AuthContext'
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import AuthenticatedHeader from './components/AuthenticatedHeader';
import UnauthenticatedHeader from './components/UnauthenticatedHeader';
import Splash from './components/Splash'
import Match from './components/Match'
import { Navbar } from 'react-bootstrap'
import ErrorNotification from './components/ErrorNotification'
import { ErrorContext } from './context/ErrorContext'
import axios from 'axios'
import Stats from './components/Stats'

function App() {
  const [user, setUser] = React.useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '{}')
  const [isAuth, setIsAuth] = React.useState(localStorage.getItem('token') ? true : false);
  const [error, setError] = React.useState(null);

  console.log('user: '+ localStorage.getItem('user'));

  var getUser = () => {
    return user;
  }

  var login = (email, password) => {
    setError(null);
    axios.post('http://localhost:8001/auth/login', { email: email, password: password })
      .then((response) => {
        console.log(response)
        setUser(response.data.user)
        setIsAuth(true)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        setError(null);

      })
      .catch((errorMsg) => {
        console.log(errorMsg.response);
        // Display an Error Message
        
        
        if(errorMsg.response === undefined) {
          setError({
            message: 'Service is currently down',
            status: 503
          })
        } else {
          setError({
            message: errorMsg.response.data.message,
            status: errorMsg.response.status
          })
        }
      })

  }


  var logout = () => {
    setIsAuth(false)
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    setUser('{}')
  }


  return (
    <AuthContext.Provider value={{ isAuth: isAuth, login: login, logout: logout, user: user, getUser: getUser }}>
      <ErrorContext.Provider value={[error, setError]}>
        <div className="App">

          <Router>
            <AuthContext.Consumer>
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
            </AuthContext.Consumer>


            <ErrorContext.Consumer>
              {([error, setError]) => (
                error === null ? '' : (
                  <ErrorNotification error={error}/>
                ))}
            </ErrorContext.Consumer>

            <Switch>
              <UnauthenticatedRoute exact path="/" component={Splash} />
              <UnauthenticatedRoute path="/register" component={Register} />
              <UnauthenticatedRoute path="/login" component={Login} />
              <AuthenticatedRoute exact path="/matches" component={Matches} />
              <AuthenticatedRoute path="/newmatch" component={CreateMatch} />
              <AuthenticatedRoute path="/matches/:_id" component={Match} />
              <AuthenticatedRoute path="/stats" component={Stats} />
              <AuthenticatedRoute path="/logout" component={Logout} />
            </Switch>
          </Router>
        </div>
      </ErrorContext.Provider>
    </AuthContext.Provider>


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
