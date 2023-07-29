import './App.css';
import React,{useEffect} from "react"
import Header from "./component/layout/Header/Header.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './component/layout/Footer/Footer';
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import Profile from "./component/User/Profile.js";
import UpdatedProfile from "./component/User/UpdatedProfile.js";
import LoginSignup from './component/User/LoginSignup';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import store from "./store"
import {loadUser} from "./actions/userAction"
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js"


function App() {
const {isAuthenticated,user}=useSelector(state=>state.user)
console.log(isAuthenticated)
  useEffect(()=>{

    // {isAuthenticated && store.dispatch(loadUser())}  
  },[]);
  
  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/product/:id" element={<ProductDetails/>} />
        <Route exact path="/products" element={<Products/>} />
        <Route path="/products/:keyword" element={<Products/>} />
        <Route exact path="/search" element={<Search/>} />
        <Route exact path="/login" element={<LoginSignup/>} />
        {isAuthenticated && <Route exact path="/account" element={<Profile/>} /> }
        {isAuthenticated && <Route exact path="/me/update" element={<UpdatedProfile/>} /> }
        <Route exact path="/cart" element={<Cart/>} />
        {/* {isAuthenticated && <Route exact path="/shipping" element={<Shipping/>} /> } */}
        {isAuthenticated && <Route exact path="/shipping" element={<Shipping/>} /> }

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
