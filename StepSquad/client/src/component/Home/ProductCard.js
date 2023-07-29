import React from 'react'
import {Link} from "react-router-dom" 
import ReactStars from "react-rating-stars-component"


const ProductCard = ({product}) => {
  const options={
      edit:false,
      color:"rgba(20,20,20,0.1)",
      activeColor:"tomato",
      size:window.innerWidth<600?10:20,
      value:product.ratings,
      isHalf:true
  
  }
  return (
    <Link className="productCard card" to={`/product/${product._id}`} style={{borderRadius:0}}>
     
            <img src={product.images[0].url} className="img-fluid" alt={product.name}/>
            <p className="ms-2 mb-0">{product.name}</p>
        <div className="ms-2">
            <ReactStars {...options}/> <span className="m-auto">({product.numOfReviews} Reviews)</span>
        </div>
        <span className="ms-2">₹{product.price}</span>


    </Link>
  )
}

export default ProductCard