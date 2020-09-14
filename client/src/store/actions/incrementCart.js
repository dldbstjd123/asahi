const IncrementCartLoader =  (id) => {
    return {
        type: "INCREMENT_TO_CART", 
        payload: {id}
    }
}

export default IncrementCartLoader;