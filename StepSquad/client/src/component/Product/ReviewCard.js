import React from 'react'
import ReactStars from 'react-rating-stars-component';
import profilePng from "../../assets/Profile.png"

const ReviewCard = ({review}) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 10 : 20,
        value: review.rating,
        isHalf: true,
      };
  return (
    <div className="reviewCard">
        <img src={profilePng} alt="User" />
        <p className="m-0">{review.name}</p>
        <ReactStars {...options}/>
        <span className="reviewCardComment">{review.comment}</span>
    </div>
  )
}

export default ReviewCard