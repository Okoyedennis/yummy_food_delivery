import {combineReducers, createStore} from "redux"
import addToCartReducer from "./reducers/addToCart";
import userReducer from "./reducers/user";


const allReducer = combineReducers({
    user: userReducer,
    count: addToCartReducer
})

const store = createStore(allReducer)
export default store;