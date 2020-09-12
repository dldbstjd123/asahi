import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Navigation from "./layout/Navigation";
import Home from "./route/Home";
import About from "./route/About";
import Menu from "./route/Menu";
import Order from "./route/Order";
import News from "./route/News";
import Reservation from "./route/Reservation";
import Footer from "./layout/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route path={"/about"} component={About} />
          <Route path={"/menu"} component={Menu} />
          <Route path={"/order"} component={Order} />
          <Route path={"/news"} component={News} />
          <Route path={"/reservation"} component={Reservation} />
        </Switch>
        <div id="footerDistance"></div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
