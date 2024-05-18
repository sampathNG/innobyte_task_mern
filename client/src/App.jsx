import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Signup from "./pages/Signup";
import Signup from "./pages/Test";
import Signin from "./pages/Signin";
import User from "./pages/User";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
