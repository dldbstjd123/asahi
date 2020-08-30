import React, {useState} from 'react';
import {AiFillFacebook, AiFillInstagram, AiFillTwitterCircle} from 'react-icons/ai';
import '../css/Footer.css';

const Footer = (props)=>{
    let d = new Date();
    let n = d.getFullYear();
    let [currentYear, setCurrentYear] = useState(n)
    return(
        <div id='footerContainer'>
            <div id='footerCopyRight'>Copyright © {currentYear} Asahi Sushi All rights reserved.</div>
            <div id='footerSocialContainer'>
                <div><AiFillFacebook color="gray" size="25px"/></div>
                <div><AiFillInstagram color="gray" size="25px"/></div>
                <div><AiFillTwitterCircle color="gray" size="25px"/></div>
            </div>
            
        </div>
    )
}

export default Footer;