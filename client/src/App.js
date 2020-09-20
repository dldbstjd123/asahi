import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';

import store from './store/store';
import "./App.css";

import ShoppingCart from "./layout/ShoppingCart";
import Navigation from "./layout/Navigation";
import Home from "./route/Home";
import About from "./route/About";
import Menu from "./route/Menu";
import Order from "./route/Order";
import Payment from './route/Payment';
import Confirmation from './route/Confirmation';
import News from "./route/News";
import Reservation from "./route/Reservation";
import Footer from "./layout/Footer";


function App() {
  return (
    <Provider store={store} >
    <div className="App">
      <Router>
        <ShoppingCart />
        <Navigation />
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route path={"/about"} component={About} />
          <Route path={"/menu"} component={Menu} />
          <Route path={"/order"} component={Order} />
          <Route path={"/payment"} component={Payment} />
          <Route path={"/confirmation"} component={Confirmation} />
          <Route path={"/news"} component={News} />
          <Route path={"/reservation"} component={Reservation} />
        </Switch>
        <div id="footerDistance"></div>
        <Footer />
      </Router>
    </div>
    </Provider>
  );
}

export default App;
