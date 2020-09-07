import React, {useState, useEffect} from "react"
import {domain} from "../config"
import {FaChevronLeft, FaChevronRight} from "react-icons/fa"
import "../css/Menu.css"

const Menu = props => {
    const [list, setList] = useState([]);
    const [updatedList, setUpdatedList] = useState({});
    const [categories, setCategories] = useState([]);
    const [currentPosition, setCurrentPosition] = useState(0);
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
                console.log(data)
                let preUpdateList = {}
                for (let i = 0; i < data.length; i++) {
                    if (preUpdateList[data[i].categoryName]) {
                        preUpdateList[data[i].categoryName].push(data[i])
                    } else {
                        preUpdateList[data[i].categoryName] = [data[i]]
                    }
                }
                for (let key in preUpdateList) {
                    console.log(`after Update${key} = ${preUpdateList[key]}`)
                }
                setUpdatedList(preUpdateList)
                setList(data)
            })
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
    }, [updatedList])
    return (
        <div className="bodyContainer">
            <div id="categoriesContainer">
                <div>
                    <FaChevronLeft className="moveLeftRight" size="20px" onClick={moveToLeft}/>
                </div>
                <div id="catagoriesItemsContainer">
                    <div id="menuMovingCategory">
                        {categories.map(item => {
                            return <div key={item}>{item}</div>
                        })}
                    </div>
                </div>
                <div>
                    <FaChevronRight className="moveLeftRight" size="20px" onClick={moveToRight}/>
                </div>
            </div>
            {categories.map(key => {
                console.log(`outer ${key}`)
                return (
                    <div key={key} className="menuPerCategoryContainer">
                        <div className="menuTitle">{key}</div>
                        <div className="menuItems">
                            {updatedList[key].map(item => {
                                console.log(key)
                                console.log(`item = ${item.name}`)
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
                                            <div className="menuItemLeft">
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

export default Menu
