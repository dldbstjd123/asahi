import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import cartReducer from './reducers/cart';

const rootReducer = combineReducers({
    cart: cartReducer,
  })

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
