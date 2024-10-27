import React from "react";
import { useEffect, useState } from "react";

export default function ProductOrders() {
  const [orders, setOrders] = useState("null");
}

useEffect(() => {
  const fetchOrders = async () => {
    const res = await fetch("http://localhost:4000/api/orders/");
    const orderdata = await res.json();
    setOrders(orderdata);
  };
  fetchOrders();
}, []);
