import React from "react";

//Function for displaying the rating as stars
const StarRating = ({ rating }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, index) => {
      return (
        <i
          key={index}
          className={`fas fa-star ${index < rating ? "filled" : ""}`}
          //Colors to the starts gold for review and silver for empty
          style={{ color: index < rating ? "#ffd700" : "#ccc" }}
        ></i>
      );
    });

  return <div>{stars}</div>;
};

export default StarRating;
