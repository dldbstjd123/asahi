const emptyCartLoader = () => {
    console.log("empty cart initiated")
    return {
        type: "EMPTY_CART"
    }
}

export default emptyCartLoader
