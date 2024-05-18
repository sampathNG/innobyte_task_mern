import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
function Signup() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};
    let isValid = true;

    if (!formData.username) {
      validationErrors.username = "Username is required";
      isValid = false;
    }
    if (!formData.phone) {
      validationErrors.phone = "phone number is required";
      isValid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Invalid email format";
      isValid = false;
    }

    if (formData.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(validationErrors);

    if (isValid) {
      const data = {
        email: formData["email"],
        password: formData["password"],
        phone: formData["phone"],
        name: formData["username"],
      };
      axios
        .post("http://localhost:5000/signup", data)
        .then(() => {
          navigate("/signin");
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/signin");
      // Handle successful form submission (e.g., send data to server)
      console.log("Form submitted successfully!", formData);
      // You would typically make an API call to submit the form data here
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <div className="flex flex-col mb-4">
        <label
          htmlFor="username"
          className="mb-2 font-bold text-lg text-gray-700"
        >
          User Name
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none "
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="phone" className="mb-2 font-bold text-lg text-gray-700">
          Phone Number
        </label>
        <input
          type="number"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none "
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="email" className="mb-2 font-bold text-lg text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <label
          htmlFor="password"
          className="mb-2 font-bold text-lg text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none "
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <label
          htmlFor="confirmPassword"
          className="mb-2 font-bold text-lg text-gray-700"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none "
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default Signup;
