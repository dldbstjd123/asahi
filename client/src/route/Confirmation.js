import React, { useEffect } from 'react';
import {useLocation} from 'react-router-dom';

const Confirmation = (props)=>{
    const location = useLocation();

    useEffect(()=>{
        console.log(location.items)
    }, [location])
    return(
        <div className='bodyContainer'>
            <div>Thank you for your order!</div>
            <div>We have recieved your order. Your order will be ready within 20 minutes.</div>
        </div>
    )
}

export default Confirmation;