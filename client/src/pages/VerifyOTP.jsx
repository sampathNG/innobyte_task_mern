import React, { useState } from "react";
import axios from "axios";

const VerifyOTP = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/signup", {
        email,
        otp,
      });
      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response.data.msg);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-2xl mb-4">Verify OTP</h2>
        <form onSubmit={handleVerify} className="flex flex-col items-center">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP"
            className="mb-4 p-2 border rounded w-64"
            required
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Verify OTP
          </button>
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
