import React from 'react';
import './css/App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <Router>

        <nav>
          <ul>
            <li>
              <Link to="/">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );

}

export default App;
