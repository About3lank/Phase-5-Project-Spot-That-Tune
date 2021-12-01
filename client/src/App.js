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
  // console.log("CODE@App.js: ", code)
  console.log("WINDOW LOCATION SEARCH: ", window.location.search)

  return (

    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/dashboard">
            <div>{code? <AuthorizedApp code={code} /> : <Login />}</div>
          </Route>
          <Route path="/testing">
            <h1>TEST ROUTE</h1>
          </Route>
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
