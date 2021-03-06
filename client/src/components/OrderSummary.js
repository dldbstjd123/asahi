import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import incrementToCartAction from "../store/actions/incrementCart"
import decrementToCartAction from "../store/actions/decrementCart"
import deleteToCartAction from "../store/actions/deleteCart"
import {FiMinus, FiPlus} from 'react-icons/fi' 
import '../css/OrderSummary.css'
import {domain} from '../config'

const OrderSummary = (props)=>{
    const history = useHistory();
    const rawData = useSelector((state) =>state.cart)
    const [total, setTotal] = useState(0)
    const [tax, setTax] = useState(0)
    const dispatch = useDispatch();

    function incrementCart(event){
        let theKey = event.currentTarget.getAttribute("akey")
        dispatch(incrementToCartAction(theKey))
    }

    function decrementCart(event){
        dispatch(decrementToCartAction(event.currentTarget.getAttribute("akey")))
    }

    function deleteCart(event){
        dispatch(deleteToCartAction(event.currentTarget.getAttribute("akey")))
    }
    function checkEmptyCart(){
        if(Object.keys(rawData).length === 0){
            alert("Your cart is empty.")
            history.push('/order')
        }
    }
    useEffect(()=>{
        checkEmptyCart()
        let totalHolder = 0
        for(let key in rawData){
            totalHolder = totalHolder + (rawData[key].basePrice * rawData[key].qty)
        }
        setTotal(totalHolder)
    }, [rawData])

    useEffect(()=>{
        //get Tax rate
        fetch(`${domain}client/tax/get`, {
            method: "get",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
        }).then((res) => res.json())
        .then((data) => {
          setTax(data.rate);
        });
    }, [])

    return(
        <div id='orderSummaryContainer'>
            <div>Order Summary</div>

            {Object.keys(rawData).length==0 ? <div>No items</div> :Object.keys(rawData).map((id)=>{
                return(
                <div>
                    <div className="orderCartItemContainer">
                        <div className='cartItemTop'>
                            <div className='cartItemName'>{rawData[id].name}</div>
                            <div className='cartDelete' akey={id} onClick={deleteCart}>delete</div>
                        </div>
                        <div className='cartItemBottom'>
                            <div>Price {(rawData[id].basePrice * 1.00).toLocaleString("en-US",{style: "currency",currency: "USD"})}</div>
                            <div className='cartItemPlusMinus'><FiMinus size="15px" akey={id} onClick={decrementCart}/>{rawData[id].qty} <FiPlus size="15px" akey={id} onClick={incrementCart}/></div>
                            <div>Total {(rawData[id].basePrice * rawData[id].qty).toLocaleString("en-US",{style: "currency",currency: "USD"})}</div>
                        </div>
                        
                    </div>
                </div>
                )
            })}
            <div>
                <div className="orderSummaryBottomPrice"><div>Subtotal:</div><div>{total.toLocaleString("en-US",{style: "currency",currency: "USD"})}</div></div>
                <div className="orderSummaryBottomPrice"><div>Tax:</div><div>{(total*tax).toLocaleString("en-US",{style: "currency",currency: "USD"})}</div></div>
                <div className="orderSummaryBottomPrice"><div>Total:</div><div>{(total+ (total*tax)).toLocaleString("en-US",{style: "currency",currency: "USD"})}</div></div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    const {cart} = state
    return {cart}
  }
  export default connect(mapStateToProps)(OrderSummary);
