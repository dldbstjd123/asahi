const AddToCartLoader =  (id, name, basePrice) => {
    return {
        type: "ADD_TO_CART", 
        payload: {id,name,basePrice}
    }

    // return async (dispatch, getState) => {
    //     //console.log(getState());
    //     const response = await fetch('https://unitechrealestate.com/mobileApp/receivableData',{
    //         method:'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             username : id,
    //             password : pw
    //         })
    //     })
    //     const resData= await response.json();
    //     dispatch({type: 'LoadReceivable', payload: resData})
    // }
}

export default AddToCartLoader;