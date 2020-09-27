import React, { useState, useEffect } from "react"
import { domain } from "../config.js"
import "../css/Categories.css"

const Categories = props => {
    const [list, setList] = useState()
    const [listLength, setListLength] = useState(0)

    function mouseEnter(event) {
        let akey = event.target.getAttribute("akey")
        document.getElementById("categoriesBoxContainer" + akey).style.top =
            "20%"
    }
    function mouseLeave(event) {
        let akey = event.target.getAttribute("akey")
        document.getElementById("categoriesBoxContainer" + akey).style.top =
            "25%"
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
                        let idKey = "categoriesBoxContainer" + i
                        return (
                            <div
                                className="categoriesImageContainer"
                                key={i}
                                akey={i}
                                onMouseEnter={mouseEnter}
                                onMouseLeave={mouseLeave}
                            >
                                <img src={url} akey={i} />
                                <div
                                    className="categoriesBoxContainer"
                                    id={idKey}
                                    akey={i}
                                >
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
