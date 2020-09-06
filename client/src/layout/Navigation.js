import React from 'react';
import { Link } from "react-router-dom";
import '../css/Navigation.css';

const Navigation = (props)=>{

    return(
        <div id='navigationContainer'>
            <Link id='navigationToHome' to="/"><img id='navigationLogo' src="/images/logo3.svg"/></Link>
            <div id='navigationLinks'>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/news">News</Link>
                {/* <Link to="/reservation">Reservations</Link> */}
            </div>
        </div>
    )
}

export default Navigation;