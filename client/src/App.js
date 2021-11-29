import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login'
import Dashboard from './components/Dashboard';
import { Container } from 'react-bootstrap';


function App() {

  const code = new URLSearchParams(window.location.search).get('code')

  return (
    <>
      {code? <Dashboard code={code} /> : <Login />}
    </>


  //   <BrowserRouter>
  //     <div className="App">
  //       <Switch>
  //         <Route path="/testing">
  //           <h1>Test Route</h1>
  //         </Route>
  //         <Route path="/">
  //           <h1>Page Count: {count}</h1>
  //         </Route>
  //       </Switch>
  //     </div>
  //   </BrowserRouter>
  );
}

export default App;
