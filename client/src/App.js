import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"

import store from "./store/store"
import "./App.css"

import ShoppingCart from "./layout/ShoppingCart"
import Navigation from "./layout/Navigation"
import Home from "./route/Home"
import About from "./route/About"
import Categories from "./route/Categories"
import Categories2 from "./route/Categories2"
import Menu from "./route/Menu"
import Menu2 from "./route/Menu2"
import Order from "./route/Order"
import Payment from "./route/Payment"
import Confirmation from "./route/Confirmation"
import News from "./route/News"
import License from "./route/License"
import Privacy from "./route/Privacy"
import Reservation from "./route/Reservation"
import Footer from "./layout/Footer"

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Router>
                    {/* <ShoppingCart /> */}
                    <Navigation />
                    <Switch>
                        <Route exact path={"/"} component={Home} />
                        <Route path={"/about"} component={About} />
                        <Route path={"/categories"} component={Categories} />
                        <Route path={"/categories2"} component={Categories2} />
                        <Route path={"/menu"} component={Menu} />
                        <Route path={"/menu2"} component={Menu2} />
                        {/* <Route path={"/order"} component={Order} /> */}
                        <Route path={"/payment"} component={Payment} />
                        <Route
                            path={"/confirmation"}
                            component={Confirmation}
                        />
                        <Route path={"/news"} component={News} />
                        <Route path={"/reservation"} component={Reservation} />
                        <Route path={"/license"} component={License} />
                        <Route path={"/privacy"} component={Privacy} />
                    </Switch>
                    <div id="footerDistance"></div>
                    <Footer />
                </Router>
            </div>
        </Provider>
    )
}

export default App
