const DeleteCartLoader =  (id) => {
    return {
        type: "DELETE_TO_CART", 
        payload: {id}
    }
}

export default DeleteCartLoader;