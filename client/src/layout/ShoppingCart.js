import React, {useState, useEffect} from 'react';
import {MdClose} from "react-icons/md"
import '../css/Shoppingcart.css';
import {FiShoppingCart} from "react-icons/fi"
import CartItem from "../components/CartItem"
import {connect, useSelector} from "react-redux"

const ShoppingCart = (props)=>{
    const [total, setTotal] = useState(0)
    const [tax, setTax] = useState(0)
    const [subTotal, setSubTotal] = useState(0)

    const rawData = useSelector((state) => state.cart)
    
    function hideCart(){
        document.getElementById("restOfParts").style.backgroundColor = "rgba(255,255,255,0)"
            document.getElementById("shoppingCartContainer").style.left = "100%"
    }
    function goToCheckOut(){
        console.log("navigate to Check Out page")
    }
    useEffect(()=>{
        let totalHolder = 0
        for(let key in rawData){
            totalHolder = totalHolder + (rawData[key].basePrice * rawData[key].qty)
        }
        setTotal(totalHolder)
        setTax(totalHolder * 0.08)
        setSubTotal(totalHolder * 1.08)
    })
    return(
        <div id='shoppingCartContainer'>
            <div id="restOfParts" onClick={hideCart}></div>
            <div id="shoppingCart">
                <div id='shoppingCartTop'>
                    <div><FiShoppingCart size="20px"/>CART</div>
                    <MdClose size="20px" onClick={hideCart}/>
                </div>
                <div id='shoppingCartItems'>
                    {Object.keys(rawData).length === 0 ?<div>Please add item to the cart.</div> :Object.keys(rawData).map((key)=> {
                        return <CartItem key={rawData[key]} itemId={key} itemName={rawData[key].name} itemQty={rawData[key].qty} itemBasePrice={rawData[key].basePrice}/>
                    })
                    }
                </div>
                <div id="shoppingCartBottom">
                <div>Subtotal: {total.toLocaleString("en-US",{style: "currency",currency: "USD"})}</div>
                    <div id='shoppingCartCheckOut' onClick={goToCheckOut}>Check Out</div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
  const {cart} = state
  return {cart}
}
export default connect(mapStateToProps)(ShoppingCart);
