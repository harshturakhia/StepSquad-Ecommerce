import React, { useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import {getProduct} from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { Rings } from "react-loader-spinner";
import {useAlert} from "react-alert"
import {Link} from "react-router-dom"
import bg from "../../assets/bg.png"

const Home = () => {

  

  const alert=useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {

    if(error){
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);
  return (
    <>
      {loading ? (
        <div className="loader">
        <Rings
          height="80"
          width="80"
          color="#9e665cab"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
        </div>
      ) : (
        <>
          <MetaData title="ECOMMERCE" />
          <div className="container-fluid">
            <div className="row ">
              <div className="col-lg-8 col-md-8 col-sm-8 bannerType m-auto ">
              <h1 className="typed">
                <span className="type1"> MAKE YOUR MOVE</span>
                <br />
                <span className="type2">MORE</span>
                <br />
                <span className="type3">COMFORTABLE</span>
              </h1>
              <Link to="/products" className="text-decoration-none"> <span className="text-decoration-none moreItem"><span className="items">DISCOVER MORE</span></span> </Link>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 bgdiv">
              <img className="img-fluid imgBg" src={bg} alt="SHOE"  />
               </div>
            </div>
          </div>


          <h2 className="homeHeading">
            Our <span className="fontWeight600">Featured Products</span>
          </h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
