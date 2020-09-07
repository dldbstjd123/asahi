import React, {useState, useEffect} from "react"
import {domain} from "../config"
import "../css/Menu.css"

const Menu = props => {
    const [list, setList] = useState([])
    const [updatedList, setUpdatedList] = useState({})
    const [categories, setCategories] = useState([])

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
                {categories.map(item => {
                    return <div key={item}>{item}</div>
                })}
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
                                            <div className='menuItemLeft'>
                                                <div className="menuItemName">
                                                    {item.name}
                                                </div>
                                                <div>{item.description}</div>
                                                <div>{item.price}</div>
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
                                            <div className='menuItemLeft'>
                                                <div className="menuItemName">
                                                    {item.name}
                                                </div>
                                                <div>{item.description}</div>
                                                <div>{item.price}</div>
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
