import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "../css/Confirmation.css"
import About from "./About.js"
import { domain } from "../config"

const Confirmation = props => {
    const location = useLocation()
    const [total, setTotal] = useState(0)
    const [tax, setTax] = useState(0)

    useEffect(() => {
        console.log(location.items)
        let sum = 0
        if (location.items.length > 0) {
            for (let i = 0; i < location.items.length; i++) {
                sum +=
                    location.items[i].amount * 100 * location.items[i].quantity
            }
            setTotal(sum)
        }
    }, [location])

    useEffect(() => {
        fetch(`${domain}client/tax/get`, {
            method: "get",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                setTax(data.rate)
            })
    }, [])
    return (
        <div className="bodyContainer">
            <div id="confirmationContainer">
                <div id="thankMessage">Thank you for your order!</div>
                <div>
                    We have recieved your order. Your order will be ready within
                    20 minutes.
                </div>
                <div>
                    The receipt has been sent to{" "}
                    <span id="emailSpan">{location.email}</span>
                </div>
                <table id="confirmationTable">
                    <tr id="tableHeader">
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    {location.items.length > 0 ? (
                        location.items.map(item => {
                            return (
                                <tr className="items">
                                    <td>{item.description}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        {(item.amount / 100).toLocaleString(
                                            "en-US",
                                            {
                                                style: "currency",
                                                currency: "USD"
                                            }
                                        )}
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <div>No items</div>
                    )}
                </table>
                <table id="summaryContainer">
                    <tr>
                        <td>Subtotal</td>
                        <td>
                            {total.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD"
                            })}
                        </td>
                    </tr>
                    <tr>
                        <td>Tax</td>
                        <td>
                            {(total * tax).toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD"
                            })}
                        </td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>
                            {(total * tax + total).toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD"
                            })}
                        </td>
                    </tr>
                </table>
            </div>
            <div id="confirmationBottomContainer">
                <About />
            </div>
        </div>
    )
}

export default Confirmation
