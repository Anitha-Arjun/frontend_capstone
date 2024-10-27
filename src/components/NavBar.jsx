// import { MdSearch } from "react-icons/md";
import React from "react";
import { Link } from "react-router-dom";
import RegisterPage from "./RegisterPage.jsx";

export default function NavBar() {
  return (
    <div className="flex flex-nowrap">
      <label htmlFor="searchbar">
        <input type="text" name="searchbar" placeholder="search by category" />
        {/* <MdSearch /> */}
      </label>
      <label htmlFor="delivery">
        Get your order:
        <select>
          <option value="Shipping">Shipping</option>
          <option value="PickUp">PickUp</option>
          <option value="Deliver">Delivered</option>
        </select>
      </label>
      <Link to="/Login">Login</Link>/<Link to="/RegisterPage">Register</Link>
      <button type="submit">Add Cart</button>
    </div>
  );
}
