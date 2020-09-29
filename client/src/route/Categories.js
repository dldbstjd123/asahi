import React, { useState, useEffect } from "react"
import { domain } from "../config.js"
import { useHistory } from "react-router-dom"
import "../css/Categories.css"
import Loading from "../components/Loading"

const Categories = props => {
    const history = useHistory()
    const [list, setList] = useState()
    const [listLength, setListLength] = useState()
    const [uploaded, setUploaded] = useState(0)
    const [loading, setLoading] = useState(true)

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
    function goToDetail(event) {
        let id = event.currentTarget.getAttribute("aid")
        history.push(`/menu2?id=${id}`)
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
                setList(data)
                let allImages = 0
                for (let i = 0; i < data.length; i++) {
                    if (data[i].image !== null) {
                        allImages++
                    }
                }
                //setListLength(allImages)
		setListLength(data.length)
                let uploaded = 0
                for (
                    let i = 0;
                    i <
                    document.getElementsByClassName("categoriesImageContainer")
                        .length;
                    i++
                ) {
                    document
                        .getElementsByClassName("categoriesImageContainer")
                        [i].children[0].addEventListener("load", () => {
                            setUploaded(prev => {
                                return prev + 1
                            })
                        })
                }
            })
    }, [])

    useEffect(() => {
        if (listLength === uploaded) {
            setLoading(false)
        }
    }, [uploaded])
    return (
        <div className="bodyContainer">
            {loading ? <Loading /> : <div id="test22"></div>}
            <div id="categoriesRouteContainer">
                {list === undefined ? (
                    <></>
                ) : (
                    list.map((item, i) => {
                        let url
                        if (item.image === null) {
                            url = "/images/category/home1.jpg"
                        } else {
                            url = "/images/category/" + item.image
                        }
                        let idKey = "categoriesBoxContainer" + i
                        return (
                            <div
                                className="categoriesImageContainer"
                                key={i}
                                akey={i}
                                aid={item.id}
                                onMouseEnter={mouseEnter}
                                onMouseLeave={mouseLeave}
                                onClick={goToDetail}
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
