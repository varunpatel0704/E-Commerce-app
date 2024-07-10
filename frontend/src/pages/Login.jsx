import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApiSlice.js";
import { loggedIn, loggedOut } from "../features/auth/authSlice.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();  
  const prevLocation = location.state?.from?.pathname;

  const dispatch = useDispatch();
  const [login, {}] = useLoginMutation();

  const disabled = !email || !password;

  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log('login request result: ',res);
      if (res?.data) {
        const {fullName, accessToken, role } = res.data;
        dispatch(loggedIn(fullName, email, role, accessToken)); //don't need to wrap data in object as payload creator will handle it
        console.log("logged in");
        toast.success(`Welcome back, ${fullName}`);

        setEmail("");
        setPassword("");
        navigate(prevLocation || '/');
      }
    } catch (error) {
      dispatch(loggedOut());

      if (!error?.data){
        setErr("No response from server");        
      } 
      else if (error.status === 401){
        setErr("Invalid password");        
      }
      else if(error.status === 404){
        setErr('Invalid email');
      }
      else{
        setErr('Internal server error, try again later.');
      } 
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-12">
      <h1 className="text-5xl relative">
        <Link to="/">Logo</Link>
      </h1>
      <div className="flex flex-col justify-center items-center gap-5 border rounded-md sm:w-[30%] w-[80%]  p-5 shadow-md">
        <h2 className="w-full p-0.5 text-2xl text-center font-medium text-black text-opacity-70">Login</h2>
        <form
          onSubmit={(e) => {
            if (disabled) {
              alert("Please provide all credentials");
              return;
            }
            handleSubmit(e);
          }}
          className="flex flex-col gap-5 w-full"
        >
          <input
            className="input-base-style w-full"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErr(null);
            }}
            required
          />
          <input
            className="input-base-style w-full"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErr(null);
            }}
            required
          />
          {err && (
            <p className="text-red-500">{err}</p>
          )}
          <button
            // disabled={disabled}
            type="submit"
            className="public-site-btn rounded shadow py-2.5 mt-5"
            // onClick={}
          >
            Login
          </button>
          <p className="text-sm ">
            Don't have an account?{" "}
            <span className="text-blue-500">
              <Link to="/register" state={{from:location.state?.from}}>Sign Up</Link>
            </span>{" "}
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
