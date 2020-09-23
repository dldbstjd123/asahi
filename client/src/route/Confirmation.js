import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { RiFileCopyLine } from "react-icons/ri"
import "../css/Confirmation.css"
import Map from "../components/Map"
import { domain } from "../config"

const Confirmation = props => {
    const location = useLocation()
    const [total, setTotal] = useState(0)
    const [tax, setTax] = useState(0)
    const [copySucceed, setCopySucceed] = useState(false)

    function copyLocation() {
        var textField = document.createElement("textarea")
        textField.innerText = "106 Legion Way SE, Olympia, WA 98501"
        document.body.appendChild(textField)
        textField.select()
        document.execCommand("copy")
        textField.remove()
        setCopySucceed(true)
        setTimeout(() => {
            setCopySucceed(false)
        }, 2000)
    }

    useEffect(() => {
        console.log(location.items)
        let sum = 0
        if (location.items) {
            for (let i = 0; i < location.items.length; i++) {
                sum +=
                    (location.items[i].amount / 100) *
                    location.items[i].quantity
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
                    The receipt has been sent to
                    <span id="emailSpan"> {location.email}</span>
                </div>
                <div id="orderIdContainer">
                    Order ID : <span>{location.orderId}</span>
                </div>
                <table id="confirmationTable">
                    <tr id="tableHeader">
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                    </tr>
                    {location.items ? (
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
                <div id="summaryContainer">
                    <table>
                        <tr>
                            <th>Subtotal</th>
                            <td>
                                {total.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD"
                                })}
                            </td>
                        </tr>
                        <tr>
                            <th>Tax</th>
                            <td>
                                {(total * tax).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD"
                                })}
                            </td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <td>
                                {(total * tax + total).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD"
                                })}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="confirmationMidContainer">
                <div id="locationHolder">
                    <div>106 Legion Way SE</div>
                    <div>
                        Olympia, WA 98501{" "}
                        <RiFileCopyLine size="15" onClick={copyLocation} />
                        {copySucceed ? (
                            <span style={{ color: "gray" }}>copied</span>
                        ) : null}
                    </div>
                </div>
                <div>(360)-705-8000</div>
            </div>
            <div id="confirmationBottomContainer">
                <Map />
            </div>
        </div>
    )
}

export default Confirmation
