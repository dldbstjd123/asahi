import React, { useState, useEffect } from "react"
import { domain } from "../config.js"
import "../css/Categories.css"

const Categories = props => {
    const [list, setList] = useState()
    const [listLength, setListLength] = useState(0)

    function mouseOver() {
        //console.log("mouseOver")
    }
    function mouseEnter(event) {
        console.log("mouseEnter")
        console.log(event.target)
    }
    function mouseLeave(event) {
        console.log("mouseLeave")
        console.log(event.target)
    }
    useEffect(() => {
        fetch(`${domain}client/category/get`, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                setListLength(data.length)
                setList(data)
            })
    }, [])
    return (
        <div className="bodyContainer">
            <div id="categoriesRouteContainer">
                <div className="categoriesImageContainer">
                    <img src="/images/home/home1.jpg" />
                    <div className="categoriesBoxContainer">Specialty Roll</div>
                </div>
                <div className="categoriesImageContainer">
                    <img src="/images/home/home2.jpg" />
                    <div className="categoriesBoxContainer">TEST</div>
                </div>
                <div className="categoriesImageContainer">
                    <img src="/images/home/home3.jpg" />
                    <div className="categoriesBoxContainer"></div>
                </div>
                <div className="categoriesImageContainer">
                    <img src="/images/home/home4.jpg" />
                    <div className="categoriesBoxContainer"></div>
                </div>
                {list === undefined ? (
                    <></>
                ) : (
                    list.map((item, i) => {
                        let url = "/images/category/" + item.image
                        return (
                            <div
                                className="categoriesImageContainer"
                                key={i}
                                onMouseOver={mouseOver}
                                onMouseEnter={mouseEnter}
                                onMouseLeave={mouseLeave}
                            >
                                <img src={url} />
                                <div className="categoriesBoxContainer">
                                    {item.name}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default Categories
