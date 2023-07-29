import React, { useEffect ,useState} from "react";
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js"
import { Rings } from "react-loader-spinner";
import {useAlert} from "react-alert"
import {addItemsToCart} from "../../actions/cartAction"

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 10 : 20,
    value: product.ratings,
    isHalf: true,
  };

  const [quantity,setQuantity]=useState(1);

  const increaseQuantity=()=>{
    if(product.Stock<=quantity) return;
    const qty=quantity+1;
    setQuantity(qty);
  }
  const decreaseQuantity=()=>{
    if(1>=quantity) return;
    const qty=quantity-1;
    setQuantity(qty);
  }

  const addToCartHandler=()=>{
    dispatch(addItemsToCart(id,quantity));
    // console.log(id,quantity);
    alert.success("Item Added to Cart");
  }



  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [dispatch,id,error,alert]);
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
        </div>):
        (
          <>
<div className="ProductDetails">
  <div className="row">
    <div className="col-lg-6 col-md-12 col-sm-12 text-center m-auto">
      <Carousel>
      {product.images &&
        product.images.map((item, i) => (
          <img
            className="CarouselImage img-fluid"
            key={i}
            src={item.url}
            alt={`${i} Slide`}
          />
        ))}
      </Carousel>
    
    </div>
    <div className="col-lg-6 col-md-12 col-sm-12 ">
    <div className="detailsBlock-1">
        <h2>{product.name}</h2>
        <p>Product # {product._id}</p>
    </div>
    <div className="detailsBlock-2">
      <ReactStars {...options}/>
      <span> ({product.numOfReviews} Reviews)</span>
    </div>
    <div className="detailsBlock-3">
      <h1>{`₹${product.price}`}</h1>
        <div className="detailsBlock-3-1">
          <div className="detailsBlock-3-1-1">
              <button onClick={decreaseQuantity}>-</button>
              <input readOnly type="number" value={quantity}/>
              <button onClick={increaseQuantity}>+</button>
          </div>
          <button
          disabled={product.Stock < 1 ? true : false}
          onClick={addToCartHandler}
          >
            Add to Cart
          </button>
      </div>
      <p>
        Status:
        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
        {product.Stock < 1 ? "OutOfStock" : "InStock"}
        </b>
      </p>
    </div>
    <div className="detailsBlock-4">
      Description : <p>{product.description}</p>
    </div>
    <button className="submitReview">
    Submit Review
    </button>
  </div>
  </div>
</div>
<h3 className="reviewsHeading">REVIEWS</h3>
<div className="reviews">
  {product.reviews && product.reviews[0]? (product.reviews.map((review)=> <ReviewCard review={review}/>)) : ( <p className="noReviews">No Reviews Yet!</p> )
  }
</div>
</>
        )}
    </>
   
  );
};

export default ProductDetails;
