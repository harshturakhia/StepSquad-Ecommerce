
import React, { useState, useEffect } from 'react';
import "./headerStyle.css"
import {ReactNavbar} from "overlay-navbar"
import logo from "../../../assets/logo.jpg"
import WebFont from "webfontloader"
import { BsSearch, BsBag, BsPerson } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const BasicComponent = () => {
  return (
    <>
      <div className="container-fluid header">
        <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-4 text-center mt-auto mb-auto">
                <Link to="/products" className="link-dark  text-decoration-none me-4">SHOP</Link>
                <a href="#" className="link-secondary text-decoration-none">ABOUT</a>
            </div>
       
            <div className="col-lg-4 col-md-4 col-sm-4 text-center">
            <Link to="/">
            <img src={logo} alt="SS" height="40" width="40" className="mt-1 mb-1"/>
            </Link>
            </div>
          
          <div className="col-lg-3 col-md-3 col-sm-3 text-end mt-auto mb-auto">
            <Link to="/search"> <span className="iconBg me-2"><BsSearch className="" /></span></Link>
           
           <Link to="/cart" className="text-decoration-none"><span className="iconBg me-2"><BsBag className="" /> </span></Link> 
            <Link to="/login"><span className="iconBg me-2"><BsPerson className="" /> </span></Link>
          </div>
        </div>
      </div>
    </>
  )
};

const OverlayComponent = () => {
  useEffect(()=>{
    WebFont.load({
      google:{
        families:['Poppins','Roboto','Sans-Serif']
      }
    })
  },[])
  const options={
    burgerColorHover: "#eb4034",
    logo,
    logoWidth: "5vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#ffffff",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1family:"Poppins",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
    // searchIcon:"true",
    // cartIcon:"true",
    // profileIcon:"true",
  }
  return <div><ReactNavbar {...options} /></div>;
};

const Header = () => {
  const [isOverlayActive, setIsOverlayActive] = useState(false);

  useEffect(() => {
    const handleMediaQuery = (event) => {
      setIsOverlayActive(event.matches);
    };

    

    const mediaQuery = window.matchMedia('(max-width: 991px)');
    setIsOverlayActive(mediaQuery.matches); // Set initial state based on media query

    mediaQuery.addEventListener('change', handleMediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQuery);
    };
  }, []);
 

  return (
    <div>
      {isOverlayActive ? <OverlayComponent /> : <BasicComponent />}
    </div>
  );
};


export default Header