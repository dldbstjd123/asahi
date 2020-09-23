import React, { useState } from "react"
import { googleMapAPI } from "../config.js"

const Map = props => {
    const [googleAPI, setGoogleAPI] = useState(
        `https://www.google.com/maps/embed/v1/place?q=place_id:ChIJVW-dpaB1kVQR7GkEIBBF6Bc&key=${googleMapAPI}`
    )
    return (
        <div id="mapContainer">
            <iframe
                frameBorder="0"
                style={{ border: "0" }}
                src={googleAPI}
                allowFullScreen
            ></iframe>
        </div>
    )
}

export default Map
