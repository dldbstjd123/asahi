import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import {BiFoodMenu} from "react-icons/bi";
import {MdPayment} from "react-icons/md";
import {GoLocation} from "react-icons/go";
import { IoIosCall } from "react-icons/io"
import { domain } from "../config"
import "../css/Home.css"
import Loading from "../components/Loading"

const Home = props => {
    const [onLoad, setOnLoad] = useState(true)

    function mouseEnterEvent(e){
   	console.log(this)
	console.log(e.target.children)
    }

    function mouseLeaveEvent(e){
	console.log(this)    
    }

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
            }, 5000)
        }

        //check image is loaded
        document
            .getElementById("mainImages")
            .childNodes[
                document.getElementById("mainImages").childNodes.length - 1
            ].addEventListener("load", () => {
                //setBodyHeight same as image
                //document.getElementById("bodyContainerHome").style.height = document.getElementById("mainImages").children[0].clientHeight + "px";
                setOnLoad(false)
            })
	//set homePageMenuContainer height same as image height
	document.getElementById("homePageMenuContainer").style.height = document.getElementById("mainImages").clientHeight + "px";
	console.log( document.getElementById("mainImages").clientHeight
)
	//hide nav menu on Home page only
	document.getElementById("navigationLinks").style.display="none"
	    return ()=>{ document.getElementById("navigationLinks").style.display="flex"
	    }
    }, [])
    return (
        <div className="bodyContainer" id="bodyContainerHome">
            {onLoad ? <Loading /> : null}
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
            </div>
	    <div id='homePageMenuContainer'>
		<Link to="/about" className="homePageMenus" onMouseEnter={mouseEnterEvent} onMouseLeave={mouseLeaveEvent}><GoLocation size="20px" /><div>Location & Business Hour</div></Link>
                <Link to="/categories" className="homePageMenus"><BiFoodMenu size="20px" /><div>Menu</div></Link>
                <Link to="/order" className="homePageMenus"><MdPayment size="20px"/><div>Online Order</div></Link>
		<a className="homePageMenus" href="tel:+13607058000"><IoIosCall size="20px" /><div>Call us</div></a>
	    </div>
        </div>
    )
}

export default Home
