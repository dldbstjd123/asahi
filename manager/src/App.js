import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import './App.css';
import Login from './route/Login.js';
import Navigation from './components/Navigation.js';
import Home from './route/Home.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/admin"} component={Login} />
          <Route path={"/admin"}>
            <Navigation />
            {/* <Home /> */}
          </Route>
        </Switch>
        <div id='footerDistance'></div>
      </Router>
  
    </div>
  );
}

export default App;
