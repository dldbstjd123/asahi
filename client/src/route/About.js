import React, { useState, useEffect } from "react"
import { domain } from "../config.js"
import { RiFileCopyLine } from "react-icons/ri"
import "../css/About.css"
import Map from "../components/Map"

const About = props => {
    const [location, setLocation] = useState("106 Legion Way SE")
    const [location2, setLocation2] = useState("Olympia, WA 98501")
    const [phone, setPhone] = useState("(360)-705-8000")
    const [copySucceed, setCopySucceed] = useState(false)
    const [copySucceed2, setCopySucceed2] = useState(false)
    const [schedule, setSchedule] = useState([])

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
    function copyPhone() {
        var textField = document.createElement("textarea")
        textField.innerText = "3607058000"
        document.body.appendChild(textField)
        textField.select()
        document.execCommand("copy")
        textField.remove()
        setCopySucceed2(true)
        setTimeout(() => {
            setCopySucceed2(false)
        }, 2000)
    }

    useEffect(() => {
        fetch(`${domain}client/hours/get`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                setSchedule(data)
            })
    }, [])

    return (
        <div className="bodyContainer" id="aboutContainer">
            {/* <div id="mapContainer">
                <iframe
                    frameBorder="0"
                    style={{border: "0"}}
                    src={googleAPI}
                    allowFullScreen
                ></iframe>
            </div> */}
            <Map />
            <div id="aboutRightSide">
                <div>
                    <div className="aboutTitle">Location</div>
                    <div>
                        <div>{location}</div>
                        <div>
                            {location2}
                            <RiFileCopyLine size="20" onClick={copyLocation} />
                            {copySucceed ? (
                                <span style={{ color: "gray" }}>copied</span>
                            ) : null}
                        </div>
                    </div>
                    <div className="aboutTitle">Phone</div>
                    <div>
                        <div>
                            <a
                                href="tel:+13607058000"
                                style={{ color: "black" }}
                            >
                                {phone}
                            </a>
                            <RiFileCopyLine size="20" onClick={copyPhone} />
                            {copySucceed2 ? (
                                <span style={{ color: "gray" }}>copied</span>
                            ) : null}
                        </div>
                    </div>
                    <div>
                        <div className="aboutTitle">Hours</div>
                        {schedule.map(item => {
                            if (item.status == 1) {
                                return (
                                    <div className="hourRows" key={item.id}>
                                        <div>{item.date.toUpperCase()}</div>
                                        <div>{item.openhour}</div>
                                        <div>-</div>
                                        <div>{item.closehour}</div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="hourRows" key={item.id}>
                                        <div>{item.date.toUpperCase()}</div>
                                        <div></div>
                                        <div>closed</div>
                                        <div></div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
