import React from "react"
import "../css/Categories.css"

const Categories = props => {
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
            </div>
        </div>
    )
}

export default Categories
