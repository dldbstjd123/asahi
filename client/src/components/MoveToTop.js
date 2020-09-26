import React, { useEffect } from "react"
import { IoIosArrowDropup } from "react-icons/io"
import "../css/MoveToTop.css"

const MoveToTop = props => {
    function moveTop() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }
    useEffect(() => {
        let Effect2
        const Effect = setInterval(() => {
            document.getElementById("moveToTopContainer").style.bottom = "25px"
            Effect2 = setTimeout(() => {
                document.getElementById("moveToTopContainer").style.bottom =
                    "20px"
            }, 500)
        }, 5000)
        return () => {
            clearInterval(Effect)
            clearTimeout(Effect2)
        }
    }, [])
    return (
        <div id="moveToTopContainer">
            <IoIosArrowDropup size="35px" onClick={moveTop} />
        </div>
    )
}

export default MoveToTop
