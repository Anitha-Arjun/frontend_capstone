import React, { useState } from "react";
import "./Checkout.css";

const statesList = [
  { code: "", name: "Select a state" },
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
];

//state variables for all the form data
const Checkout = ({ cartItems, total, onCheckoutSuccess, onBack }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const [orderStatus, setOrderStatus] = useState(null);

  //Validating that form needs to have all the necessary inputs
  const validate = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!address) newErrors.address = "Address is required.";
    if (!city) newErrors.city = "City is required.";
    if (!state) newErrors.state = "State is required.";
    if (!zip || !/^\d{5}$/.test(zip))
      newErrors.zip = "ZIP code must be 5 digits.";
    if (!cardNumber || !/^\d{16}$/.test(cardNumber))
      newErrors.cardNumber = "Card number must be 16 digits.";
    if (
      !expiryDate ||
      !/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(expiryDate)
    )
      newErrors.expiryDate = "Invalid expiry date.";
    if (!cvv || !/^\d{3}$/.test(cvv)) newErrors.cvv = "CVV must be 3 digits.";
    return newErrors;
  };

  //function to handle checkouts
  const handleCheckout = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    handleOrder();
    alert("Order placed successfully!");
    onCheckoutSuccess();
  };

  //function to handle the orderdata
  const handleOrder = async () => {
    const orderData = {
      //generate random order id
      order_id: Math.floor(Math.random() * 100000),
      total_amount: total,
      status: "pending",
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      //sends the post request to place order
      const response = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //converts to json
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        setOrderStatus("Order placed successfully!");
      } else {
        setOrderStatus("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setOrderStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="cart-summary">
        <h3>Cart Summary</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {/* renders the items for each product in cart*/}
            {cartItems.map((item) => (
              <li key={item.product_id}>
                {item.product_name} - ${item.price.toFixed(2)} x {item.quantity}
              </li>
            ))}
          </ul>
        )}
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>

      <form onSubmit={handleCheckout} className="checkout-form">
        <h3>Personal Information</h3>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}

        <h3>Address</h3>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && <span className="error">{errors.address}</span>}

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {errors.city && <span className="error">{errors.city}</span>}

        <div className="address-row">
          <select value={state} onChange={(e) => setState(e.target.value)}>
            {statesList.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.state && <span className="error">{errors.state}</span>}

          <input
            type="text"
            placeholder="ZIP Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          {errors.zip && <span className="error">{errors.zip}</span>}
        </div>

        <h3>Payment Information</h3>
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        {errors.cardNumber && (
          <span className="error">{errors.cardNumber}</span>
        )}

        <input
          type="text"
          placeholder="Expiry Date (MM/YY)"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        {errors.expiryDate && (
          <span className="error">{errors.expiryDate}</span>
        )}

        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
        {errors.cvv && <span className="error">{errors.cvv}</span>}

        <button type="submit">Place Order</button>
        <button type="button" onClick={onBack} className="back-button">
          Back to Cart
        </button>
      </form>
    </div>
  );
};

export default Checkout;
