import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BiFoodMenu } from "react-icons/bi"
import { MdPayment } from "react-icons/md"
import { GoLocation } from "react-icons/go"
import { IoIosCall } from "react-icons/io"
import { BsChevronDoubleDown } from "react-icons/bs"
import { domain } from "../config"
import "../css/Home.css"
import Loading from "../components/Loading"

const Home = props => {
    const [onLoad, setOnLoad] = useState(true)

    function mouseEnterEvent(e) {
        console.log(this)
        console.log(e.target.children)
    }

    function mouseLeaveEvent(e) {
        console.log(this)
    }
    function changeStringToSpan(e) {
        let chosenDiv = document.getElementById(e)
        let chosenDivHTML = chosenDiv.innerHTML
        let chosenDivLength = chosenDivHTML.length

        console.log(chosenDivLength)
        let newHTML = "<span></span>"
        //reset innerHTML
        chosenDiv.innerHTML = ""
        for (let i = 0; i < chosenDivLength; i++) {
            let node = document.createElement("span")
            var textnode = document.createTextNode(chosenDivHTML[i])
            node.appendChild(textnode)
            chosenDiv.appendChild(node)
        }
    }

    function moveToBottom() {
        document.body.scrollTop =
            document.getElementById("navigationContainer").clientHeight +
            document.getElementById("mainPageTop").clientHeight
        document.documentElement.scrollTop =
            document.getElementById("navigationContainer").clientHeight +
            document.getElementById("mainPageTop").clientHeight
    }

    useEffect(() => {
        let mainImage = document.getElementById("mainImages").childNodes
        mainImage[0].style.opacity = 1
        let length = mainImage.length
        let current = 1
        if (length > 1) {
            setInterval(() => {
                if (current == length - 2) {
                    mainImage[current - 1].style.opacity = 0
                    mainImage[current].style.opacity = 1
                    current = 0
                } else if (current == 0) {
                    mainImage[length - 2].style.opacity = 0
                    mainImage[0].style.opacity = 1
                    current++
                } else {
                    mainImage[current - 1].style.opacity = 0
                    mainImage[current].style.opacity = 1
                    current++
                }
            }, 5000)
        }
        //check image is loaded
        document
            .getElementById("mainImages")
            .childNodes[
                document.getElementById("mainImages").childNodes.length - 2
            ].addEventListener("load", () => {
                //setBodyHeight same as image
                //document.getElementById("bodyContainerHome").style.height = document.getElementById("mainImages").children[0].clientHeight + "px";
                setOnLoad(false)
            })
        //set homePageMenuContainer height same as image height
        document.getElementById("homePageMenuContainer").style.height =
            document.getElementById("mainImages").clientHeight + "px"
        console.log(document.getElementById("mainImages").clientHeight)
        //hide nav menu on Home page only
        document.getElementById("navigationLinks").style.display = "none"
        return () => {
            document.getElementById("navigationLinks").style.display = "flex"
        }
    }, [])

    useEffect(() => {
        //updateDivToSpan
        changeStringToSpan("mainPageTopText1")
        changeStringToSpan("mainPageTopText2")
        changeStringToSpan("mainPageTopText3")
    }, [])
    useEffect(() => {
        let timer = 1
        let div1 = document.getElementById("mainPageTopText1")
        let div2 = document.getElementById("mainPageTopText2")
        let div3 = document.getElementById("mainPageTopText3")
        let div4 = document.getElementById("mainPageTopText4")
        for (let i = 0; i < div1.children.length; i++) {
            setTimeout(() => {
                div1.children[i].style.opacity = 1
            }, timer * 100)
            timer++
        }
        for (let i = 0; i < div2.children.length; i++) {
            setTimeout(() => {
                div2.children[i].style.opacity = 1
            }, timer * 100)
            timer++
        }
        for (let i = 0; i < div3.children.length; i++) {
            setTimeout(() => {
                div3.children[i].style.opacity = 1
            }, timer * 100)
            timer += 0.5
        }
        setTimeout(() => {
            div4.style.opacity = 1
        }, timer * 100)
    }, [onLoad])
    useEffect(() => {
        let div4 = document.getElementById("mainPageTopText4")
        let effect2
        let effect1 = setInterval(() => {
            div4.style.marginTop = "4%"
            div4.style.marginBottom = "1%"
            effect2 = setTimeout(() => {
                div4.style.marginTop = "2.5%"
                div4.style.marginBottom = "2.5%"
            }, 500)
        }, 5000)
        return () => {
            clearInterval(effect1)
            clearTimeout(effect2)
        }
    }, [])
    return (
        <div className="bodyContainer" id="bodyContainerHome">
            {onLoad ? <Loading /> : null}
            <div id="mainPageTop">
                <img src="/images/mainPage.jpg" />
                <div id="mainPageTopTextContainer">
                    <div id="mainPageTopText1">WELCOME TO</div>
                    <div id="mainPageTopText2">ASAHI SUSHI</div>
                    <div id="mainPageTopText3">
                        Experience Impeccable Japanes Cuisine
                    </div>
                    <div id="mainPageTopText4" onClick={moveToBottom}>
                        <BsChevronDoubleDown size="30" />
                    </div>
                </div>
            </div>
            <div id="mainImages">
                {/* <div style={{width:'100%', height:"100%",opacity: "0"}}></div>
                <div style={{backgroundImage:"url("+domain+"images/home/home2.jpg)", width:'100%', height:"100%",opacity: "0"}}></div>
                <div style={{backgroundImage:"url("+domain+"images/home/home3.jpg)", width:'100%', height:"100%",opacity: "0"}}></div>
                <div style={{backgroundImage:"url("+domain+"images/home/home4.jpg)", width:'100%', height:"100%",opacity: "0"}}></div>
                <div style={{backgroundImage:"url("+domain+"images/home/home5.jpg)", width:'100%', height:"100%",opacity: "0"}}></div>
                <div style={{backgroundImage:"url("+domain+"images/home/home6.jpg)", width:'100%', height:"100%",opacity: "0"}}></div>
                <div style={{backgroundImage:"url("+domain+"images/home/home7.jpg)", width:'100%', height:"100%",opacity: "0"}}></div>
                <div style={{backgroundImage:"url("+domain+"images/home/home8.jpg)", width:'100%', height:"100%",opacity: "0"}}></div>
                <div style={{backgroundImage:"url("+domain+"images/home/home9.jpg)", width:'100%', height:"100%",opacity: "0"}}></div>
                <div style={{backgroundImage:"url("+domain+"images/home/home10.jpg)", width:'100%', height:"100%",opacity: "0"}}></div> */}
                <img src="/images/home/home1.jpg" />
                <img src="/images/home/home2.jpg" />
                {/* <img src="/images/home/home1.jpg" />
                <img src="/images/home/home2.jpg" />
                <img src="/images/home/home3.jpg" />
                <img src="/images/home/home4.jpg" />
                <img src="/images/home/home5.jpg" />
                <img src="/images/home/home6.jpg" />
                <img src="/images/home/home7.jpg" />
                <img src="/images/home/home8.jpg" />
                <img src="/images/home/home9.jpg" />
                <img src="/images/home/home10.jpg"/> */}
                <div id="homePageMenuContainer">
                    <Link
                        to="/about"
                        className="homePageMenus"
                        onMouseEnter={mouseEnterEvent}
                        onMouseLeave={mouseLeaveEvent}
                    >
                        <GoLocation size="20px" />
                        <div>Location & Business Hour</div>
                    </Link>
                    <Link to="/categories" className="homePageMenus">
                        <BiFoodMenu size="20px" />
                        <div>Menu</div>
                    </Link>
                    <Link to="/order" className="homePageMenus">
                        <MdPayment size="20px" />
                        <div>Online Order</div>
                    </Link>
                    <a className="homePageMenus" href="tel:+13607058000">
                        <IoIosCall size="20px" />
                        <div>Call us</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Home
