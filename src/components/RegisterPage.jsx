import React from "react";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const [users, setUsers] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    password: "",
    confirm_password: "",
    mob_no: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:4000/api/users");
      const userData = await res.json();
      console.log(userData);
      setUsers(userData);
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      //post request to create a new user
      const newUser = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      console.log(newUser);
      //adding new user to the users
      setUser(newUser, ...user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="first_name">
            First Name
            <input
              type="text"
              value={formData.first_name}
              onChange={handleChange}
            ></input>
          </label>

          <label htmlFor="last_name">
            Last Name
            <input
              type="text"
              value={formData.last_name}
              onChange={handleChange}
            ></input>
          </label>

          <label htmlFor="e-mail">
            email_id
            <input
              type="text"
              value={formData.email_id}
              onChange={handleChange}
            ></input>
          </label>

          <label htmlFor="password">
            Password
            <input
              type="password"
              value={formData.password}
              onChange={handleChange}
            ></input>
          </label>

          <label htmlFor="confirm_password">
            Confirm Password
            <input
              type="password"
              value={formData.confirm_password}
              onChange={handleChange}
            ></input>
          </label>

          <label htmlFor="mob_no">
            Mob no.
            <input
              type="number"
              value={formData.mob_no}
              onChange={handleChange}
            ></input>
          </label>

          <label htmlFor="street">
            Address
            <input
              type="text"
              value={formData.address}
              onChange={handleChange}
            ></input>
          </label>

          <label htmlFor="city">
            City
            <input
              type="text"
              value={formData.city}
              onChange={handleChange}
            ></input>
          </label>

          <label htmlFor="State">
            State
            <input
              type="text"
              value={formData.state}
              onChange={handleChange}
            ></input>
          </label>

          <label htmlFor="zipcode">
            Zipcode
            <input
              type="text"
              value={formData.zipcode}
              onChange={handleChange}
            ></input>
          </label>

          <button type="Submit">Submit</button>
        </form>
      </div>
      <div>
        {users &&
          users.map((user) => (
            <div key={user._id}>
              <h2>{user.first_name}</h2>
              <h2>{user.last_name}</h2>
              <p>{user.email_id}</p>
              <p>{user.password}</p>
              <p>{user.confirm_password}</p>
              <p>{user.mob_no}</p>
              <p>{user.street}</p>
              <p>{user.city}</p>
              <p>{user.state}</p>
              <p>{user.zipcode}</p>
            </div>
          ))}
      </div>
    </>
  );
}
