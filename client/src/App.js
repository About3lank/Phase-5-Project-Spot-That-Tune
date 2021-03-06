import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login'
import AuthorizedApp from './components/AuthorizedApp';
import Dashboard from './components/Dashboard';
import { Container } from 'react-bootstrap';

function App() {
  const code = new URLSearchParams(window.location.search).get('code')
  // console.log("WINDOW LOCATION SEARCH: ", window.location.search)

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/testing">
            <h1>TEST ROUTE</h1>
          </Route>
          <Route path="/">
            {code? <AuthorizedApp code={code} /> : <Login />}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
