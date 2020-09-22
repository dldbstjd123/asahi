import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import "../css/Confirmation.css"
import About from "./About.js"

const Confirmation = props => {
    const location = useLocation()

    useEffect(() => {
        console.log(location.items)
    }, [location])
    return (
        <div className="bodyContainer">
            <div id="confirmationContainer">
                <div id="thankMessage">Thank you for your order!</div>
                <div>
                    We have recieved your order. Your order will be ready within
                    20 minutes.
                </div>
                <div>The receipt has been sent to {location.email}</div>
                <div>
                    <div id="tableHeader">
                        <div>Item</div>
                        <div>Quantity</div>
                    </div>
                    {location.items.map(item => {
                        return (
                            <div className="items">
                                <div>{item.description}</div>
                                <div>{item.quantity}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div id="confirmationBottomContainer">
                <About />
            </div>
        </div>
    )
}

export default Confirmation
ƒ
