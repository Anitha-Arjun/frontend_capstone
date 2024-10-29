import React from "react";

const StarRating = ({ rating }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, index) => {
      return (
        <i
          key={index}
          className={`fas fa-star ${index < rating ? "filled" : ""}`}
          style={{ color: index < rating ? "#ffd700" : "#ccc" }} //Colors to the starts gold for review and silver for empty
        ></i>
      );
    });

  return <div>{stars}</div>;
};

export default StarRating;
