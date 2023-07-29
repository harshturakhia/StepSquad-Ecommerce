import React from 'react'
import logo from "../../../assets/logo.jpg"

const Footer = () => {
  return (
    <>
          <div className="container-fluid footer py-3 mt-5">
            <div className="row">
                <div className="col-lg-4 col-md-3 col-sm-3">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <img src={logo} alt="" className="img-fluid" width="40" height="40" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <p>Copyright © Stepsquad</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <p>© 2021 A Company Building trust through exceptional products and service.All rights reserved.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                
                             </div>
                                <div className="col-lg-4 col-md-4 col-sm-4"></div>
                                <div className="col-lg-4 col-md-4 col-sm-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-3">
                    <div className="row mb-5">
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            <h5>PRODUCTS</h5>
                        </div>
                        <div className="row mb-2">
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <a href="" className="text-decoration-none fonts">MEN</a>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-lg-3 col-md-3 col-sm-3">
                            <a href="" className="text-decoration-none fonts" style={{'color':'black'}}>WOMEN</a>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-lg-3 col-md-3 col-sm-3">
                            <a href="" className="text-decoration-none fonts" style={{'color':'black'}}>KIDS</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-3">
                    <div className="row mb-5">
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <h5>ABOUT</h5>
                            </div>
                            <div className="row mb-2">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <a href="" className="text-decoration-none fonts" style={{'color':'black'}}>SHIPPING & RETURNS</a>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                <a href="" className="text-decoration-none fonts" style={{'color':'black'}}>CONTACT US</a>
                                </div>
                            </div>
                        
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-3">
                <div className="row mb-5">
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <h5>POLICIES</h5>
                            </div>
                            <div className="row mb-2">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <a href="" className="text-decoration-none fonts" style={{'color':'black'}}>PRIVACY POLICY</a>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                <a href="" className="text-decoration-none fonts" style={{'color':'black'}}>TERMS & CONDITIONS</a>
                                </div>
                            </div>
                        
                    </div>  
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer