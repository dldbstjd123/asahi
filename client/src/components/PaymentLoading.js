import React from 'react';
import '../css/PaymentLoading.css'

const PaymentLoading = (props)=>{
    return(
        <div id='paymentLoadingContainer'>
            <img id="loadingCircle" src="/images/logoCircle.svg" />
        </div>
    )
}

export default PaymentLoading;