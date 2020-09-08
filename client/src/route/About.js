import React, {useState, useEffect} from "react"
import {domain} from "../config.js"
import "../css/About.css"

const About = props => {
    const [location, setLocation] = useState("106 Legion Way SE")
    const [location2, setLocation2] = useState("Olympia, WA 98501")
    const [phone, setPhone] = useState("(360)-705-8000")
    const [schedule, setSchedule] = useState([])

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
            <div id="mapContainer">
                <iframe
                    frameBorder="0"
                    style={{border: "0"}}
                    src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJVW-dpaB1kVQR7GkEIBBF6Bc&key=AIzaSyCX2DfHSIyHJkRY1hoCHuZrp6I2Go2lkXM"
                    allowFullScreen
                ></iframe>
            </div>
            <div id="aboutRightSide">
                <div>
                    <div className="aboutTitle">Location</div>
                    <div>
                        <div>{location}</div>
                        <div>{location2}</div>
                    </div>
					<div className="aboutTitle">Phone</div>
                    <div>
                        <div>{phone}</div>
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
