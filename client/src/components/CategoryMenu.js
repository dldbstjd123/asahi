import React from "react"
import { Link } from "react-router-dom"
import "../css/CategoryMenu.css"

const CategoryMenu = props => {
    let source = "/images/category/category" + props.picture + ".png"
    let url = "/menu2?id=" + props.picture
    return (
        <Link to={url} class="categoryMenu">
            <div class="categoryMenuImageContainer">
                <img src={source} width="230" height="230" />
            </div>
            <div class="categoryMenuName">{props.category}</div>
        </Link>
    )
}

export default CategoryMenu
