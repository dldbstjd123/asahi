import React from "react"
import { useDispatch } from 'react-redux';
import incrementToCartAction from "../store/actions/incrementCart"
import decrementToCartAction from "../store/actions/decrementCart"
import deleteToCartAction from "../store/actions/deleteCart"
import {FiMinus, FiPlus} from 'react-icons/fi' 
import "../css/CartItem.css"

const CartItem = props => {
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
    return (
        <div className="cartItemContainer">
            <div className='cartItemTop'>
                <div className='cartItemName'>{props.itemName}</div>
                <div className='cartDelete' akey={props.itemId} onClick={deleteCart}>delete</div>
            </div>
            <div className='cartItemBottom'>
                <div>Price {(props.itemBasePrice * 1.00).toLocaleString("en-US",{style: "currency",currency: "USD"})}</div>
                <div className='cartItemPlusMinus'><FiMinus size="15px" akey={props.itemId} onClick={decrementCart}/>{props.itemQty} <FiPlus size="15px" akey={props.itemId} onClick={incrementCart}/></div>
                <div>Total {(props.itemBasePrice * props.itemQty).toLocaleString("en-US",{style: "currency",currency: "USD"})}</div>
            </div>
            
        </div>
    )
}

export default CartItem
