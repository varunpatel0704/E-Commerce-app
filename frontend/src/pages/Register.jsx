import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      dispatch(register(formData));
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-12">
      <h1 className="text-5xl relative"><Link to='/' >Logo</Link></h1>

      <div className="flex flex-col justify-center items-center gap-5 border rounded-md sm:w-[30%] w-[80%] p-5 shadow-md">
        <h2 className="w-full p-0.5 text-2xl text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <input
            className="input-base-style w-full"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="input-base-style w-full"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="input-base-style w-full"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            className="input-base-style w-full"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" className="public-site-btn rounded shadow py-2.5 mt-5">Sign Up</button>

          <p className="text-sm " >Already registered? <span className="text-blue-500" ><Link to="/login">Login</Link></span> </p>
        </form>
      </div>
    </main>
  );
}

export default RegisterPage;
