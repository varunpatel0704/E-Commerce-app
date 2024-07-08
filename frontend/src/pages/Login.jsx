import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApiSlice.js";
import { loggedIn } from "../features/auth/authSlice.js";
import { useDispatch } from "react-redux";

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const [login, {error}] = useLoginMutation();
  // console.log(error?.status);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async function(e){
    e.preventDefault();
    try {
      const res = await login({email: formData.email, password: formData.password}).unwrap();
      // console.log('login request result: ',res);
      if(res){
        const {accessToken, role} = res.data;
        dispatch(loggedIn(formData.email, role, accessToken));
        console.log('logged in');
      }

    } catch (error) {
      if(!error?.data)
        console.log('no response from server');

      else if(error.status === 404 || error.status === 401)
        console.log('invalid email/password');

      else  
        console.log('login failed');
    }

  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-12">
      <h1 className="text-5xl relative"><Link to='/' >Logo</Link></h1>
      <div className="flex flex-col justify-center items-center gap-5 border rounded-md sm:w-[30%] w-[80%]  p-5 shadow-md">
        <h2 className="w-full p-0.5 text-2xl text-center">Login</h2>
        <form className="flex flex-col gap-5 w-full">
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
          {(error?.status === 401)&&<p>Invalid email/password</p>}
          <button
            type="submit"
            className="public-site-btn rounded shado py-2.5 mt-5"
            onClick={handleSubmit}
          >
            Login
          </button>
          <p className="text-sm " >Don't have an account? <span className="text-blue-500" ><Link to="/register">Sign Up</Link></span> </p>
        </form>
      </div>
    </main>
  );
}

export default RegisterPage;
