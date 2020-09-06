import React, {useEffect} from "react"
import "../css/Home.css"

const Home = props => {
    useEffect(() => {
        let mainImage = document.getElementById("mainImages").childNodes
        mainImage[0].style.opacity = 1
        let length = mainImage.length
        let current = 1
        if (length > 1) {
            setInterval(() => {
                if (current == length - 1) {
                    mainImage[current - 1].style.opacity = 0
                    mainImage[current].style.opacity = 1
                    current = 0
                } else if (current == 0) {
                    mainImage[length - 1].style.opacity = 0
                    mainImage[0].style.opacity = 1
                    current++
                } else {
                    mainImage[current - 1].style.opacity = 0
                    mainImage[current].style.opacity = 1
                    current++
                }
            }, 3000)
        }
    }, [])
    return (
        <div className="bodyContainer">
            <div id="mainImages">
                <img src="/images/combo1.jpeg" />
                <img src="/images/combo2.jpeg" />
                <img src="/images/combo3.jpeg" />
            </div>
        </div>
    )
}

export default Home
