import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { getCookie } from './util/cookie';
import { UserProvider } from './userContext';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login"></Redirect>
            </Route>
            <Route path="/login" component={LoginForm} />
            <Route path="/dashboard" render={props => {
              let token = getCookie('token');
              return token.length > 0 ? <Dashboard /> : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            }} />
          </Switch>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
