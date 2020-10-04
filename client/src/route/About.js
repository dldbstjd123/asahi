import React, { useState, useEffect } from "react"
import { domain } from "../config.js"
import { RiFileCopyLine } from "react-icons/ri"
import { GoLocation } from "react-icons/go"
import { IoIosCall } from "react-icons/io"
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
                    {/* <div className="aboutTitle">Location</div> */}
                    <div>
                        <div>
                            <a
                                href="https://www.google.com/maps/place/Asahi+Sushi/@47.04334,-122.9010329,15z/data=!4m5!3m4!1s0x0:0x17e84510200469ec!8m2!3d47.04334!4d-122.9010329"
                                style={{
                                    color: "black",
                                    textDecoration: "none"
                                }}
                            >
                                {" "}
                                <GoLocation size="20" />
                                {location}
                            </a>
                        </div>
                        <div>
                            <a
                                href="https://www.google.com/maps/place/Asahi+Sushi/@47.04334,-122.9010329,15z/data=!4m5!3m4!1s0x0:0x17e84510200469ec!8m2!3d47.04334!4d-122.9010329"
                                style={{
                                    color: "black",
                                    textDecoration: "none"
                                }}
                            >
                                {location2}
                            </a>
                            <RiFileCopyLine
                                size="13"
                                onClick={copyLocation}
                                style={{ cursor: "pointer", color: "gray" }}
                            />
                            {copySucceed ? (
                                <span style={{ color: "gray" }}>copied</span>
                            ) : null}
                        </div>
                    </div>
                    {/* <div className="aboutTitle">Phone</div> */}
                    <div>
                        <div>
                            <a
                                href="tel:+13607058000"
                                style={{
                                    color: "black",
                                    textDecoration: "none"
                                }}
                            >
                                <IoIosCall size="20" />
                                {phone}
                            </a>
                            <RiFileCopyLine
                                size="13"
                                onClick={copyPhone}
                                style={{ cursor: "pointer", color: "gray" }}
                            />
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
