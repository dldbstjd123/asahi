import React, { useState, useEffect } from "react"
import { domain } from "../config.js"
import { useHistory } from "react-router-dom"
import "../css/Categories2.css"
import CategoryMenu from "../components/CategoryMenu"

const Categories = props => {
    const history = useHistory()
    return (
        <div className="categoryContainer">
            <div id="menuContainer">
                <CategoryMenu category={"Speciality Roll"} picture={1} />
                <CategoryMenu category={"Nigiri"} picture={2} />
                <CategoryMenu category={"Boat & Omakase"} picture={3} />
                <CategoryMenu category={"Sashimi"} picture={4} />
                <CategoryMenu category={"Bento"} picture={5} />
                <CategoryMenu category={"Appetizers"} picture={6} />
            </div>
        </div>
    )
}

export default Categories
