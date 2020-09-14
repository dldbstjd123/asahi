import React, {useState, useEffect} from "react"
import {domain} from "../config"
import {FaChevronLeft, FaChevronRight} from "react-icons/fa"
import "../css/Order.css"
import Loading from "../components/Loading"
import addToCartAction from "../store/actions/addToCart"

import { useSelector, useDispatch } from 'react-redux';

const Order = props => {
    const dispatch = useDispatch();
    const rawData = useSelector((state) => state.cart)
    
    const [onLoad, setOnLoad] = useState(true)
    const [list, setList] = useState([]);
    const [updatedList, setUpdatedList] = useState({});
    const [categories, setCategories] = useState([]);
    const [currentPosition, setCurrentPosition] = useState(0);
    let count = -1;
    function moveToLeft(){
        let totalPages = Math.floor(categories.length / 5)
        if(categories.length%5 != 0 ){
            totalPages++
        }
        let totalWidth = document.getElementById("menuMovingCategory").clientWidth*totalPages
        if(totalWidth < document.getElementById("menuMovingCategory").clientWidth){
            totalWidth = document.getElementById("menuMovingCategory").clientWidth
        }
        if(currentPosition == 0){
            document.getElementById("menuMovingCategory").style.left = -totalWidth + document.getElementById("menuMovingCategory").clientWidth + "px"
            setCurrentPosition(-totalWidth + document.getElementById("menuMovingCategory").clientWidth)
        }else{
            document.getElementById("menuMovingCategory").style.left = (currentPosition + document.getElementById("menuMovingCategory").clientWidth)+ "px"
            setCurrentPosition(prev => prev + document.getElementById("menuMovingCategory").clientWidth)
        }
    }
    function moveToRight(){
        let totalPages = Math.floor(categories.length / 5)
        if(categories.length%5 != 0 ){
            totalPages++
        }
        let totalWidth = document.getElementById("menuMovingCategory").clientWidth*totalPages
        if(totalWidth < document.getElementById("menuMovingCategory").clientWidth){
            totalWidth = document.getElementById("menuMovingCategory").clientWidth
        }
        if(currentPosition == totalWidth - document.getElementById("menuMovingCategory").clientWidth){
            document.getElementById("menuMovingCategory").style.left = "0px"
            setCurrentPosition(0)
        }else{
            document.getElementById("menuMovingCategory").style.left = currentPosition - document.getElementById("menuMovingCategory").clientWidth + "px"
            setCurrentPosition(prev => prev - document.getElementById("menuMovingCategory").clientWidth)
        }
    }
    function scrollTo(event){
        let n = event.target.getAttribute("akey")
        let baseHeight = document.getElementById("navigationContainer").clientHeight
        let menuHeight = 0
        if(n != 0){
            for(let i=0; i<n; i++){
                menuHeight += document.getElementsByClassName("menuPerCategoryContainer")[i].clientHeight
            }
        }
        document.body.scrollTop = baseHeight + menuHeight
        document.documentElement.scrollTop = baseHeight + menuHeight
    }
    function addToCart(event){
        let id = event.target.getAttribute('akey')
        let name = event.target.getAttribute('aname')
        let basePrice = event.target.getAttribute('aprice')
        dispatch(addToCartAction(id,name, basePrice))
        showShoppingCart();
    }
    function showShoppingCart(){
        document.getElementById("shoppingCartContainer").style.left = "0"
        setTimeout(()=>{
            document.getElementById("restOfParts").style.backgroundColor = "rgba(255,255,255,0.4)"
        },600)
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

            const categoryNavigationEffect = setInterval(()=>{
                document.getElementById("moveLeft").style.left = "-5px"
                document.getElementById("moveRight").style.left = "5px"
                setTimeout(()=>{
                    document.getElementById("moveLeft").style.left = "0px"
                    document.getElementById("moveRight").style.left = "0px"
                },500)
            }, 5000)
            return ()=>clearInterval(categoryNavigationEffect)
    }, [])

    useEffect(() => {
        for (let key in updatedList) {
            setCategories(array => {
                if (array.indexOf(key) == -1) {
                    array.push(key)
                }
                return array
            })
        }
        setOnLoad(false)
    }, [updatedList])
    return (
        <div className="bodyContainer">
            {onLoad? <Loading /> : null}
            <div id="categoriesContainer">
                <div>
                    <FaChevronLeft className="moveLeftRight" id="moveLeft" size="20px" onClick={moveToLeft}/>
                </div>
                <div id="catagoriesItemsContainer">
                    <div id="menuMovingCategory">
                        {categories.map(item => {
                            count++
                            return <div key={item} akey={count} onClick={scrollTo}>{item}</div>
                        })}
                    </div>
                </div>
                <div>
                    <FaChevronRight className="moveLeftRight" id="moveRight" size="20px" onClick={moveToRight}/>
                </div>
            </div>
            {categories.map(key => {
                return (
                    <div key={key} className="menuPerCategoryContainer">
                        <div className="menuTitle">{key}</div>
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
                                                <div>{item.description}</div>
                                                <div>
                                                    {item.price.toLocaleString(
                                                        "en-US",
                                                        {
                                                            style: "currency",
                                                            currency: "USD"
                                                        }
                                                    )}
                                                </div>
                                                </div>
                                                <div id='addToCart' akey={item.id} aname={item.name} aprice={item.price} onClick={addToCart}>Add to cart</div>
                                            </div>
                                            <div>
                                                <img
                                                    src={source}
                                                    style={{
                                                        width: "200px",
                                                        height: "100%"
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
                                                <div>{item.description}</div>
                                                <div>
                                                    {item.price.toLocaleString(
                                                        "en-US",
                                                        {
                                                            style: "currency",
                                                            currency: "USD"
                                                        }
                                                    )}
                                                </div>
                                                </div>
                                                <div id='addToCart' akey={item.id} aname={item.name} aprice={item.price} onClick={addToCart}>Add to cart</div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Order
