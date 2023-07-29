import {legacy_createStore as createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk";


 import {composeWithDevTools} from "redux-devtools-extension";
import { productReducer,productDetailsReducer } from "./reducers/productReducer";
import { profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";

 const reducer= combineReducers({
        products:productReducer,
        productDetails:productDetailsReducer,
        user:userReducer,
        profile:profileReducer,
        cart:cartReducer
 })

 let intialState={
        cart:{
               cartItems:localStorage.getItem("cartItems")?
               JSON.parse(localStorage.getItem("cartItems")):[],
        },
        shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
 };

 const middleware=[thunk];

 const store=createStore(reducer,intialState,composeWithDevTools(applyMiddleware(...middleware)));

 export default store;