import React from 'react';
import PaymentForm from '../components/PaymentForm'
import OrderSummary from '../components/OrderSummary'
import '../css/Payment.css'



const Payment = (props)=>{
    return(
        <div className='bodyContainer'>
            <div id='paymentContainer'>
                <PaymentForm />
                <OrderSummary />
            </div>
        </div>
    )
}

export default Payment;