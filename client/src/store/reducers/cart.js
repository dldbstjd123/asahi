const initialState = {
    // Example
    // 25: {
    //     qty:1,
    //     name:"salmon roll",
    //     basePrice: 10
    // }
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            if(state[action.payload.id]){
                return {
                    ...state,
                    [action.payload.id]: {...state[action.payload.id], qty:state[action.payload.id].qty+1}
                }
            }else{
                return {
                    ...state,
                    [action.payload.id]: {qty:1, name: action.payload.name, basePrice: action.payload.basePrice}
                }
            }
        case 'INCREMENT_TO_CART':
            return {
                ...state,
                [action.payload.id]: {...state[action.payload.id], qty:state[action.payload.id].qty+1}
            }
        case 'DECREMENT_TO_CART':
            if(state[action.payload.id].qty==1){
                let newState = {...state}
                delete newState[action.payload.id]
                return{
                    ...newState
                }
            }else{
                return {
                    ...state,
                    [action.payload.id]: {...state[action.payload.id], qty:state[action.payload.id].qty-1}
                }
            }
        case 'DELETE_TO_CART':
            let newState = {...state}
            delete newState[action.payload.id]
                return{
                    ...newState
                }
        default:
            return state;
    }
}

export default cartReducer; 
