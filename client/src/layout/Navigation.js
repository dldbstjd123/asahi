import React from "react"
import { Link } from "react-router-dom"
// import {FiShoppingCart} from "react-icons/fi"
import "../css/Navigation.css"

const Navigation = props => {
    function showShoppingCart() {
        document.getElementById("shoppingCartContainer").style.left = "0"
        setTimeout(() => {
            document.getElementById("restOfParts").style.backgroundColor =
                "rgba(255,255,255,0.4)"
        }, 600)
    }
    function onlineOrder() {
        fetch("/client/redirectToClover")
    }
    return (
        <div id="navigationContainer">
            <Link id="navigationToHome" to="/">
                <img id="navigationLogo" src="/images/mainLogo2.svg" />
            </Link>
            {/* <FiShoppingCart size='20px' id='cartIcon' onClick={showShoppingCart}/> */}
            <div id="navigationLinks">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/categories">Menu</Link>
                <a
                    href="https://www.clover.com/online-ordering/asahi-olympia"
                    target="_blank"
                    onClick={onlineOrder}
                >
                    Order
                </a>
                {/* <Link to="/order">Order</Link> */}
                {/* <Link to="/news">News</Link> */}
                {/* <Link to="/reservation">Reservations</Link> */}
            </div>
        </div>
    )
}

export default Navigation
