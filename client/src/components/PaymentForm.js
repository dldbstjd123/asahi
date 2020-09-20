import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {domain} from "../config.js"
import '../css/PaymentForm.css'
import PaymentLoading from './PaymentLoading';


const PaymentForm = (props)=>{
    const history = useHistory();
    const rawData = useSelector((state) => state.cart)
    const [loading, setLoading] =useState(false)
    const [error, setError] = useState('')

    function inputClicked(input) {
        document.getElementsByClassName('paymentLabel')[input].style.top = '-28px';
        document.getElementsByClassName('paymentLabel')[input].style.fontSize = '15px';
        document.getElementsByClassName('paymentLabel')[input].style.color = 'gray';
        document.getElementsByClassName('paymentBar2')[input].style.left = '0';
        document.getElementsByClassName('inputContainers')[input].children[0].focus();
    }
    function inputOut(input) {
        if (document.getElementsByClassName('inputContainers')[input].children[0].value == "") {
            document.getElementsByClassName('paymentLabel')[input].style.top = '12px';
            document.getElementsByClassName('paymentLabel')[input].style.fontSize = '20px';
            document.getElementsByClassName('paymentLabel')[input].style.color = 'white';
        }
        document.getElementsByClassName('paymentBar2')[input].style.left = '-100%';
    }

    function validate(){
        

        if(Object.keys(rawData).length === 0){
            alert("Your cart is empty.")
            history.push('/order')
        }
    }

    async function validateForm() {
        setLoading(true)
        let name = document.getElementsByClassName('inputContainer')[0].children[0].value
        let email = document.getElementsByClassName('inputContainer')[1].children[0].value
        let cardNumber = document.getElementsByClassName('inputContainer')[2].children[0].value
        let expMonth = document.getElementsByClassName('inputContainer2')[0].children[0].value
        let expYear = document.getElementsByClassName('inputContainer2')[1].children[0].value
        let cvv = document.getElementsByClassName('inputContainer2')[2].children[0].value
        resetColor();
        document.getElementsByClassName('paymentLabel')[1].innerHTML = 'Email';
        if (name.length < 1) {
            document.getElementsByClassName('inputContainer')[0].children[0].focus();
            //document.getElementsByClassName('paymentLabel')[0] = 'Please insert your name.';
            document.getElementsByClassName('paymentLabel')[0].style.color = "red"
        } else if (email.length < 1) {
            document.getElementsByClassName('inputContainer')[1].children[0].focus();
            //document.getElementsByClassName('paymentLabel')[1].innerHTML = 'Please insert your email.';
            document.getElementsByClassName('paymentLabel')[1].style.color = "red"
        } else if (validateEmail(email) == false) {
            document.getElementsByClassName('inputContainer')[1].children[0].focus();
            document.getElementsByClassName('paymentLabel')[1].style.color = "red"
            document.getElementsByClassName('paymentLabel')[1].innerHTML = 'Please insert valid email.';
        } else if (cardNumber.length < 1) {
            document.getElementsByClassName('inputContainer')[2].children[0].focus();
            //document.getElementsByClassName('paymentLabel')[2].innerHTML = 'Please insert card number.';
            document.getElementsByClassName('paymentLabel')[2].style.color = "red"
        } else if (expMonth.length < 1) {
            document.getElementsByClassName('inputContainer2')[0].children[0].focus();
            //document.getElementsByClassName('paymentLabel')[3].innerHTML = 'Please insert expiration month.';
            document.getElementsByClassName('paymentLabel')[3].style.color = "red"
        } else if (expYear.length < 1) {
            document.getElementsByClassName('inputContainer2')[1].children[0].focus();
            //document.getElementsByClassName('paymentLabel')[4].innerHTML = 'Please insert expiration year.';
            document.getElementsByClassName('paymentLabel')[4].style.color = "red"
        } else if (cvv.length < 1) {
            document.getElementsByClassName('inputContainer2')[2].children[0].focus();
            //document.getElementsByClassName('paymentLabel')[5].innerHTML = 'Please insert cvv.';
            document.getElementsByClassName('paymentLabel')[5].style.color = "red"
        } else {
            resetColor()
            try {
                let fetchData = await fetch(`${domain}clover/proceed`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name, email, cardNumber, expMonth, expYear, cvv, cart: rawData})
                })
                    .then(res => res.json())
                    if(fetchData.status == 1){
                        //redirect to confirmation page
                        history.push('/confirmation')
                    }else{
                        //show error message
                        setError(fetchData.error)
                        setLoading(false)
                    }
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
    }
    function resetColor(){
        document.getElementsByClassName('paymentLabel')[0].style.color = "gray"
        document.getElementsByClassName('paymentLabel')[1].style.color = "gray"
        document.getElementsByClassName('paymentLabel')[2].style.color = "gray"
        document.getElementsByClassName('paymentLabel')[3].style.color = "gray"
        document.getElementsByClassName('paymentLabel')[4].style.color = "gray"
        document.getElementsByClassName('paymentLabel')[5].style.color = "gray"

    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    return(
            <form id='paymentForm'>
                    <div className='inputContainer inputContainers'>
                        <input type="text" name="name" required onFocus={() => inputClicked(0)} onBlur={() => inputOut(0)} />
                        <label className="paymentLabel" onClick={() => inputClicked(0)}>Name</label>
                        <div className='paymentBar'><div className='paymentBar2'></div></div>
                    </div>
                    <div className='inputContainer inputContainers'>
                        <input type="text" name="email" required onFocus={() => inputClicked(1)} onBlur={() => inputOut(1)} />
                        <label className="paymentLabel" onClick={() => inputClicked(1)}>Email</label>
                        <div className='paymentBar'><div className='paymentBar2'></div></div>
                    </div>
                    <div className='inputContainer inputContainers'>
                    <input type="text" name="email" required onFocus={() => inputClicked(2)} onBlur={() => inputOut(2)} />
                        <label className="paymentLabel" onClick={() => inputClicked(2)}>Card Number</label>
                        <div className='paymentBar'><div className='paymentBar2'></div></div>
                    </div>
                    <div id='expiration'>
                        <div className='inputContainer2 inputContainers'>
                        <input type="text" name="month" required onFocus={() => inputClicked(3)} onBlur={() => inputOut(3)} />
                            <label className="paymentLabel" onClick={() => inputClicked(3)}>Exp Month</label>
                            <div className='paymentBar'><div className='paymentBar2'></div></div>
                        </div>
                        <div className='inputContainer2 inputContainers'>
                        <input type="text" name="year" required onFocus={() => inputClicked(4)} onBlur={() => inputOut(4)} />
                            <label className="paymentLabel" onClick={() => inputClicked(4)}>Exp Year</label>
                            <div className='paymentBar'><div className='paymentBar2'></div></div>
                        </div>
                        <div className='inputContainer2 inputContainers'>
                        <input type="text" name="cvv" required onFocus={() => inputClicked(5)} onBlur={() => inputOut(5)} />
                            <label className="paymentLabel" onClick={() => inputClicked(5)}>CVV</label>
                            <div className='paymentBar'><div className='paymentBar2'></div></div>
                        </div>
                    </div>
                    <div id="paymentFormAfterSubmit">{error}</div>
                    <div id='paymentFormSendContainer'>
                        {loading === false?<input id="paymentFormSend" type="button" value="Pay" onClick={() => validateForm()} /> :<PaymentLoading />}
                    </div>
                </form>
    )
}

export default PaymentForm;