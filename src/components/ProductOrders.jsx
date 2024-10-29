import React from "react";
import { useState } from "react";

// export default function ProductOrders() {
//   const [orders, setOrders] = useState("null");
// }

// useEffect(() => {
//   const fetchOrders = async () => {
//     const res = await fetch("http://localhost:4000/api/orders/");
//     const orderdata = await res.json();
//     setOrders(orderdata);
//   };
//   fetchOrders();
// }, []);

//Baby Names API

function ProductOrders() {
  const apiKey = " rZtNJh6u0+TUMW0vOyeX1g==r8O9AEXVNXf3MFp5";
  const [names, setNames] = useState(null);

  const fetchNames = async () => {
    try {
      const res = await fetch("https://api.api-ninjas.com/v1/babynames");
      const data = await res.json();
      console.log(data);
      setNames(data);
    } catch (error) {
      console.error(e);
    }
  };
}

export default ProductOrders;
