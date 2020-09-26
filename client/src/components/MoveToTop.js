import React, { useEffect } from "react"
import { IoIosArrowDropup } from "react-icons/io"
import "../css/MoveToTop.css"

const MoveToTop = props => {
    function moveTop() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }
    function handleScroll() {
        if (window.scrollY < 200) {
            document.getElementById("moveToTopContainer").style.visibility =
                "hidden"
        } else {
            document.getElementById("moveToTopContainer").style.visibility =
                "visible"
        }
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
        window.addEventListener("scroll", handleScroll)
        return () => {
            clearInterval(Effect)
            clearTimeout(Effect2)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])
    return (
        <div id="moveToTopContainer">
            <IoIosArrowDropup size="35px" onClick={moveTop} />
        </div>
    )
}

export default MoveToTop
