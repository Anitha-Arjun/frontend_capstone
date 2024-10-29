import React, { useState } from "react";
import "./Checkout.css"; 

const statesList = [
  { code: "", name: "Select a state" },
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

const Checkout = ({ cartItems, total, onCheckoutSuccess, onBack }) => {
  const [activeTab, setActiveTab] = useState("shipping");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingZip, setShippingZip] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [copyBillingAddress, setCopyBillingAddress] = useState("");
  const [copyShippingAddress, setCopyShippingAddress] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (activeTab === "shipping") {
      if (!shippingAddress)
        newErrors.shippingAddress = "Shipping address is required.";
      if (!shippingCity) newErrors.shippingCity = "City is required.";
      if (!shippingState) newErrors.shippingState = "State is required.";
      if (!shippingZip || !/^\d{5}$/.test(shippingZip))
        newErrors.shippingZip = "ZIP code must be 5 digits.";
    } else if (activeTab === "billing") {
      if (!billingAddress)
        newErrors.billingAddress = "Billing address is required.";
      if (!billingCity) newErrors.billingCity = "City is required.";
      if (!billingState) newErrors.billingState = "State is required.";
      if (!billingZip || !/^\d{5}$/.test(billingZip))
        newErrors.billingZip = "ZIP code must be 5 digits.";
    } else if (activeTab === "payment") {
      if (!cardNumber || !/^\d{16}$/.test(cardNumber))
        newErrors.cardNumber = "Card number must be 16 digits.";
      if (
        !expiryDate ||
        !/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(expiryDate)
      )
        newErrors.expiryDate = "Invalid expiry date.";
      if (!cvv || !/^\d{3}$/.test(cvv)) newErrors.cvv = "CVV must be 3 digits.";
    }
    return newErrors;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (activeTab === "payment") {
      alert("Order placed successfully!");
      onCheckoutSuccess();
    } else {
      setActiveTab((prev) => {
        if (prev === "shipping") return "billing";
        if (prev === "billing") return "payment";
        return prev;
      });
    }
  };

  const handleCopyBillingAddress = () => {
    if (copyShippingAddress) {
      setBillingAddress(shippingAddress);
      setBillingCity(shippingCity);
      setBillingState(shippingState);
      setBillingZip(shippingZip);
    }
  };

  const handleCopyShippingAddress = () => {
    if (copyShippingAddress) {
      setBillingAddress(shippingAddress);
      setBillingCity(shippingCity);
      setBillingState(shippingState);
      setBillingZip(shippingZip);
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
            {cartItems.map((item) => (
              <li key={item.product_id}>
                {item.product_name} - ${item.price.toFixed(2)} x {item.quantity}
              </li>
            ))}
          </ul>
        )}
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>

      <div className="tabs">
        <button
          className={activeTab === "shipping" ? "active" : ""}
          onClick={() => setActiveTab("shipping")}
        >
          Shipping Address
        </button>
        <button
          className={activeTab === "billing" ? "active" : ""}
          onClick={() => {
            if (activeTab === "shipping") {
              setActiveTab("billing");
            }
          }}
        >
          Billing Address
        </button>
        <button
          className={activeTab === "payment" ? "active" : ""}
          onClick={() => {
            if (activeTab === "billing") {
              setActiveTab("payment");
            }
          }}
        >
          Payment Information
        </button>
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

        {activeTab === "shipping" && (
          <>
            <h3>Shipping Address</h3>
            <input
              type="text"
              placeholder="Address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
            {errors.shippingAddress && (
              <span className="error">{errors.shippingAddress}</span>
            )}

            <input
              type="text"
              placeholder="City"
              value={shippingCity}
              onChange={(e) => setShippingCity(e.target.value)}
            />
            {errors.shippingCity && (
              <span className="error">{errors.shippingCity}</span>
            )}

            <div className="address-row">
              <select
                value={shippingState}
                onChange={(e) => setShippingState(e.target.value)}
              >
                {statesList.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.shippingState && (
                <span className="error">{errors.shippingState}</span>
              )}

              <input
                type="text"
                placeholder="ZIP Code"
                value={shippingZip}
                onChange={(e) => setShippingZip(e.target.value)}
              />
              {errors.shippingZip && (
                <span className="error">{errors.shippingZip}</span>
              )}
            </div>
          </>
        )}

        {activeTab === "billing" && (
          <>
            <h3>Billing Address</h3>
            <input
              type="text"
              placeholder="Address"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
            />
            {errors.billingAddress && (
              <span className="error">{errors.billingAddress}</span>
            )}

            <input
              type="text"
              placeholder="City"
              value={billingCity}
              onChange={(e) => setBillingCity(e.target.value)}
            />
            {errors.billingCity && (
              <span className="error">{errors.billingCity}</span>
            )}

            <div className="address-row">
              <select
                value={billingState}
                onChange={(e) => setBillingState(e.target.value)}
              >
                {statesList.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.billingState && (
                <span className="error">{errors.billingState}</span>
              )}

              <input
                type="text"
                placeholder="ZIP Code"
                value={billingZip}
                onChange={(e) => setBillingZip(e.target.value)}
              />
              {errors.billingZip && (
                <span className="error">{errors.billingZip}</span>
              )}
            </div>

            <div>
              <label>
                <input
                  type="checkbox"
                  checked={copyShippingAddress}
                  onChange={(e) => {
                    setCopyShippingAddress(e.target.checked);
                    handleCopyShippingAddress();
                  }}
                />
                Copy shipping address to billing address
              </label>
            </div>
          </>
        )}

        {activeTab === "payment" && (
          <>
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
          </>
        )}

        <button type="submit">
          {activeTab === "payment" ? "Place Order" : "Next"}
        </button>
        <button type="button" onClick={onBack} className="back-button">
          Back to Cart
        </button>
      </form>
    </div>
  );
};


//By me
//const  handleQtyFunction (){
//const [quantity, setQuantity] = useState("null")
const fetchQuantity = async() => {
  const res = await Product.fetch(`http://localhost:4000/api/products`)
  const data = await res.json();
  setQuantity(data);

}
//}
//  const async handleQtyfunction (prid, price, q, prdctQty, input, subtotal) {
//   try {
//     console.log(id, q, price);


//     // const response = await fetch(`/cart/add-product/change_qty?prdctId=${id}&&val=${q}&&price=${price}&&productQty=${prdctQty}`, {
//     //   method: 'GET',
//     // });
//     const response = await fetch('/cart/add-product/change_qty', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         prdctId: id,
//         val: q,
//         price: price,
//         productQty: prdctQty,
//       }),
//     });
//     alert('get');
//     const data = await response.json();
//     console.log(data);
    
//     let newQty = data.qty < 1 ? 1 : data.qty;
//     input.value = newQty;
//     input.value = data.qty;
//     subtotal.innerHTML = data.sub_total;
    
//     const totalElement = document.querySelector('#total');
//     totalElement.innerHTML = data.total;
//     console.log(data.total);
//   } catch (err) {
//     alert('something went wrong');
//   }
// }
export default Checkout;
