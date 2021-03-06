import React, { useState, useEffect } from "react"
import { domain } from "../config"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useLocation, useHistory } from "react-router-dom"
import "../css/Menu.css"
import Loading from "../components/Loading"
import MoveToTop from "../components/MoveToTop"

const Menu2 = props => {
    const history = useHistory()
    let query = new URLSearchParams(useLocation().search)
    const [onLoad, setOnLoad] = useState(true)
    const [list, setList] = useState([])
    const [chosenCategory, setChosenCategory] = useState()
    const [updatedList, setUpdatedList] = useState({})
    const [categories, setCategories] = useState([])
    const [categoriesId, setCategoriesId] = useState([])
    const [categoriesDescription, setCategoriesDescription] = useState([])
    const [currentPosition, setCurrentPosition] = useState(0)
    let count = -1
    let categoryIndex = -1
    function moveToLeft() {
        let totalPages = Math.floor(categories.length / 5)
        if (categories.length % 5 != 0) {
            totalPages++
        }
        let totalWidth =
            document.getElementById("menuMovingCategory").clientWidth *
            totalPages
        if (
            totalWidth <
            document.getElementById("menuMovingCategory").clientWidth
        ) {
            totalWidth = document.getElementById("menuMovingCategory")
                .clientWidth
        }
        if (currentPosition == 0) {
            document.getElementById("menuMovingCategory").style.left =
                -totalWidth +
                document.getElementById("menuMovingCategory").clientWidth +
                "px"
            setCurrentPosition(
                -totalWidth +
                    document.getElementById("menuMovingCategory").clientWidth
            )
        } else {
            document.getElementById("menuMovingCategory").style.left =
                currentPosition +
                document.getElementById("menuMovingCategory").clientWidth +
                "px"
            setCurrentPosition(
                prev =>
                    prev +
                    document.getElementById("menuMovingCategory").clientWidth
            )
        }
    }
    function moveToRight() {
        let totalPages = Math.floor(categories.length / 5)
        if (categories.length % 5 != 0) {
            totalPages++
        }
        let totalWidth =
            document.getElementById("menuMovingCategory").clientWidth *
            totalPages
        if (
            totalWidth <
            document.getElementById("menuMovingCategory").clientWidth
        ) {
            totalWidth = document.getElementById("menuMovingCategory")
                .clientWidth
        }
        if (
            currentPosition * -1 ==
            totalWidth -
                document.getElementById("menuMovingCategory").clientWidth
        ) {
            document.getElementById("menuMovingCategory").style.left = "0px"
            setCurrentPosition(0)
        } else {
            document.getElementById("menuMovingCategory").style.left =
                currentPosition -
                document.getElementById("menuMovingCategory").clientWidth +
                "px"
            setCurrentPosition(
                prev =>
                    prev -
                    document.getElementById("menuMovingCategory").clientWidth
            )
        }
    }
    function sendTo(event) {
        window.scrollTo(0, 0)
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        let n = event.currentTarget.getAttribute("aid")
        history.push(`/menu2?id=${n}`)
    }
    function resetCategoryLeft() {
        document.getElementById("menuMovingCategory").style.left = "0px"
    }

    useEffect(() => {
        fetch(`${domain}client/menu/get`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                let preUpdateList = {}
                for (let i = 0; i < data.length; i++) {
                    if (preUpdateList[data[i].categoryName]) {
                        preUpdateList[data[i].categoryName].push(data[i])
                    } else {
                        preUpdateList[data[i].categoryName] = [data[i]]
                    }
                }
                setUpdatedList(preUpdateList)
                setList(data)
            })

        // let categoryNavigationEffect2
        // const categoryNavigationEffect = setInterval(() => {
        //     document.getElementById("moveLeft").style.left = "-5px"
        //     document.getElementById("moveRight").style.left = "5px"
        //     categoryNavigationEffect2 = setTimeout(() => {
        //         document.getElementById("moveLeft").style.left = "0px"
        //         document.getElementById("moveRight").style.left = "0px"
        //     }, 500)
        // }, 5000)
        // window.addEventListener("resize", resetCategoryLeft)
        // return () => {
        //     clearInterval(categoryNavigationEffect)
        //     clearTimeout(categoryNavigationEffect2)
        //     window.removeEventListener("resize", resetCategoryLeft)
        // }
        //Change Nav Img
        document.getElementById("navigationContainer").style.backgroundImage =
            "url(" + domain + "images/nav/navImage3.png)"
    }, [])

    useEffect(() => {
        for (let key in updatedList) {
            setCategoriesId(array3 => {
                array3.push(updatedList[key][0].category)
                return array3
            })
            setCategories(array => {
                if (array.indexOf(key) == -1) {
                    array.push(key)
                    setCategoriesDescription(array2 => {
                        if (updatedList[key][0].categoryDescription === null) {
                            array2.push(undefined)
                        } else {
                            array2.push(updatedList[key][0].categoryDescription)
                        }
                        return array2
                    })
                }
                return array
            })
        }
        setOnLoad(false)
    }, [updatedList])

    useEffect(() => {
        let queryId = query.get("id")
        fetch(`${domain}client/menu/getId`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: queryId })
        })
            .then(res => res.json())
            .then(data => {
                setChosenCategory(data[0].categoryName)
            })
    })
    return (
        <div className="bodyContainer">
            {onLoad ? <Loading /> : null}
            <div id="categoriesContainer">
                <div>
                    <FaChevronLeft
                        className="moveLeftRight"
                        id="moveLeft"
                        size="20px"
                        onClick={moveToLeft}
                    />
                </div>
                <div id="catagoriesItemsContainer">
                    <div id="menuMovingCategory">
                        {categories.map(item => {
                            count++
                            if (item.trim().includes(" ")) {
                                let itemList = item.trim().split(" ")
                                return (
                                    <div
                                        key={item}
                                        akey={count}
                                        aid={categoriesId[count]}
                                        onClick={sendTo}
                                    >
                                        {itemList.map(key => {
                                            return <div>{key}</div>
                                        })}
                                    </div>
                                )
                            } else {
                                return (
                                    <div
                                        key={item}
                                        akey={count}
                                        aid={categoriesId[count]}
                                        onClick={sendTo}
                                    >
                                        {item}
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
                <div>
                    <FaChevronRight
                        className="moveLeftRight"
                        id="moveRight"
                        size="20px"
                        onClick={moveToRight}
                    />
                </div>
            </div>
            {categories.map(key => {
                categoryIndex++
                if (key == chosenCategory) {
                    return (
                        <div key={key} className="menuPerCategoryContainer">
                            <div className="menuTitle">
                                {key}{" "}
                                {categoriesDescription[categoryIndex] !==
                                undefined ? (
                                    <div style={{ fontSize: "14px" }}>
                                        {categoriesDescription[categoryIndex]}
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="menuItems">
                                {updatedList[key].map(item => {
                                    let source = `${domain}client/image?image=${item.image}`
                                    if (item.image != null) {
                                        return (
                                            <div
                                                key={item.id}
                                                className="menuItemContainerWithImage"
                                            >
                                                <div className="menuItemLeft">
                                                    <div className="menuItemName">
                                                        {item.name}
                                                    </div>
                                                    <div>
                                                        {item.description}
                                                    </div>
                                                    <div>
                                                        {item.price.toLocaleString(
                                                            "en-US",
                                                            {
                                                                style:
                                                                    "currency",
                                                                currency: "USD"
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <img
                                                        src={source}
                                                        style={{
                                                            width: "200px",
                                                            // height: "100%",
                                                            borderRadius:
                                                                "0 10px 10px 0"
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div
                                                key={item.id}
                                                className="menuItemContainerWithOutImage"
                                            >
                                                <div className="menuItemLeft">
                                                    <div className="menuItemName">
                                                        {item.name}
                                                    </div>
                                                    <div>
                                                        {item.description}
                                                    </div>
                                                    <div>
                                                        {item.price.toLocaleString(
                                                            "en-US",
                                                            {
                                                                style:
                                                                    "currency",
                                                                currency: "USD"
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    )
                }
            })}
            <MoveToTop />
        </div>
    )
}

export default Menu2
