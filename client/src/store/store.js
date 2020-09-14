import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'

import cartReducer from './reducers/cart';

const rootReducer = combineReducers({
    cart: cartReducer,
  })

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));
store.subscribe(()=>{
    //console.log(`subscribe = ${store.getState()}`)
})

export default store;
