import React, { Component } from 'react';
import Home from './Home';
import Login from './Login';
import Admin from './Admin';
import Error404 from './Error404';
import { PrivateRoute } from '../utils/customRouter';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/admin" component={Admin} />
          <Route component={Error404} />
        </Switch>
      </Router>
    );
  }
}

export default App;
