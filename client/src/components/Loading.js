import React from "react"
import "../css/Loading.css"

const Loading = props => {
    return (
        <div id="loadingScreen">
            <img id="loadingCircle" src="/images/logoCircle.svg" />
            <img id="loadingWord" src="/images/logoWord.svg" />
        </div>
    )
}

export default Loading
