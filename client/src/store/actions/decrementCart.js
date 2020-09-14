const DecrementCartLoader =  (id) => {
    return {
        type: "DECREMENT_TO_CART", 
        payload: {id}
    }
}

export default DecrementCartLoader;