import React from "react"
import { useDispatch } from 'react-redux';
import incrementToCartAction from "../store/actions/incrementCart"
import decrementToCartAction from "../store/actions/decrementCart"
import deleteToCartAction from "../store/actions/deleteCart"
import {FiMinus, FiPlus} from 'react-icons/fi' 
import "../css/CartItem.css"

const CartItem = props => {
    console.log(`props.itemId = ${props.itemId}`)
    const dispatch = useDispatch();
    function incrementCart(event){

        console.log('CartItem Trigger',event.target.getAttribute("akey"))
        dispatch(incrementToCartAction(event.target.getAttribute("akey")))
    }

    function decrementCart(event){
        dispatch(decrementToCartAction(event.target.getAttribute("akey")))
    }
    function deleteCart(event){
        dispatch(deleteToCartAction(event.target.getAttribute("akey")))
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
