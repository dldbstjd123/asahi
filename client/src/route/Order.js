import React, { useState, useEffect } from "react"
import { domain } from "../config"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import "../css/Order.css"
import Loading from "../components/Loading"
import MoveToTop from "../components/MoveToTop"
import addToCartAction from "../store/actions/addToCart"

import { useSelector, useDispatch } from "react-redux"

const Order = props => {
    const dispatch = useDispatch()
    const rawData = useSelector(state => state.cart)

    const [onLoad, setOnLoad] = useState(true)
    const [list, setList] = useState([])
    const [updatedList, setUpdatedList] = useState({})
    const [categories, setCategories] = useState([])
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
    function scrollTo(event) {
        let n = event.currentTarget.getAttribute("akey")
        let baseHeight = document.getElementById("navigationContainer")
            .clientHeight
        let menuHeight = 0
        if (n != 0) {
            for (let i = 0; i < n; i++) {
                menuHeight += document.getElementsByClassName(
                    "menuPerCategoryContainer"
                )[i].clientHeight
            }
        }
        document.body.scrollTop = baseHeight + menuHeight
        document.documentElement.scrollTop = baseHeight + menuHeight
	highlightChosenMenu(n)
    }
    function highlightChosenMenu(n){
        let menuCategory = document.getElementById("menuMovingCategory").children
	for(let i=0; i<menuCategory.length;i++){
	    menuCategory[i].style.borderBottom = "0px"
	}
	 menuCategory[n].style.borderBottom = "2px solid white"
    }
    function addToCart(event) {
        let id = event.target.getAttribute("akey")
        let name = event.target.getAttribute("aname")
        let basePrice = event.target.getAttribute("aprice")
        dispatch(addToCartAction(id, name, basePrice))
        showShoppingCart()
    }
    function showShoppingCart() {
        document.getElementById("shoppingCartContainer").style.left = "0"
        setTimeout(() => {
            document.getElementById("restOfParts").style.backgroundColor =
                "rgba(255,255,255,0.4)"
        }, 600)
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

        let categoryNavigationEffect2
        const categoryNavigationEffect = setInterval(() => {
            document.getElementById("moveLeft").style.left = "-5px"
            document.getElementById("moveRight").style.left = "5px"
            categoryNavigationEffect2 = setTimeout(() => {
                document.getElementById("moveLeft").style.left = "0px"
                document.getElementById("moveRight").style.left = "0px"
            }, 500)
        }, 5000)
        window.addEventListener("resize", resetCategoryLeft)
        return () => {
            clearInterval(categoryNavigationEffect)
            clearTimeout(categoryNavigationEffect2)
            window.removeEventListener("resize", resetCategoryLeft)
        }
    }, [])

    useEffect(() => {
        for (let key in updatedList) {
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
                                        onClick={scrollTo}
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
                                        onClick={scrollTo}
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
                return (
                    <div key={key} className="menuPerCategoryContainer">
                        <div className="menuTitle">
                            {key}{" "}
                            {categoriesDescription[categoryIndex] !==
                            undefined ? (
                                <span style={{ fontSize: "16px" }}>
                                    {categoriesDescription[categoryIndex]}
                                </span>
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
                                            <div className="orderItemLeft">
                                                <div>
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
                                                    id="addToCart"
                                                    akey={item.id}
                                                    aname={item.name}
                                                    aprice={item.price}
                                                    onClick={addToCart}
                                                >
                                                    Add to cart
                                                </div>
                                            </div>
                                            <div>
                                                <img
                                                    src={source}
                                                    style={{
                                                        width: "200px",
                                                        height: "100%",
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
                                            <div className="orderItemLeft orderItemLeftWithoutImage">
                                                <div>
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
                                                    id="addToCart"
                                                    akey={item.id}
                                                    aname={item.name}
                                                    aprice={item.price}
                                                    onClick={addToCart}
                                                >
                                                    Add to cart
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                )
            })}
            <MoveToTop />
        </div>
    )
}

export default Order
