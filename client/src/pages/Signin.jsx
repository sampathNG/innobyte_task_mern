import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;
    const validationErrors = {};
    let isValid = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Invalid email format";
      isValid = false;
    }
    if (formData.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }
    setErrors(validationErrors);
    if (isValid) {
      const response = await axios.post("http://localhost:5000/signin", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      // console.log(localStorage.getItem("token"));
      console.log("User signed in successfully");
      navigate("/user");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-24"
    >
      <div className="flex flex-col mb-4">
        <label
          htmlFor="email"
          className="mb-2 font-bold text-lg text-gray-700 text-center"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div className="flex flex-col my-8">
        <label
          htmlFor="password"
          className="mb-2 font-bold text-lg text-gray-700 text-center"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none "
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 rounded-lg hover:bg-black w-screen py-4 font-semibold text-xl"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
export default Signin;
