import React, { useState } from "react"
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai"
import { IoIosCall } from "react-icons/io"
import { ImYelp } from "react-icons/im"
import "../css/Footer.css"

const Footer = props => {
    let d = new Date()
    let n = d.getFullYear()
    let [currentYear, setCurrentYear] = useState(n)

    return (
        <div id="footerContainer">
            <a
                id="footerLeftContainer"
                href="tel:+13607058000"
                style={{ color: "gray" }}
            >
                {/* Copyright © {currentYear} Asahi Sushi All rights reserved. */}
                <IoIosCall color="gray" size="25px" />
                <div>(360)-705-8000</div>
            </a>
            <div id="footerSocialContainer">
                <a href="https://facebook.com/Asahi-Sushi-102796514642869">
                    <AiFillFacebook color="gray" size="25px" />
                </a>
                <a href="https://www.instagram.com/asahi_sushi_olympia/?hl=en">
                    <AiFillInstagram color="gray" size="25px" />
                </a>
                <a
                    href="https://www.yelp.com/biz/asahi-sushi-olympia?osq=asahi+sushi+olympia"
                    style={{ marginTop: "2px" }}
                >
                    <ImYelp color="gray" height="21px" width="25px" />
                </a>
            </div>
        </div>
    )
}

export default Footer
