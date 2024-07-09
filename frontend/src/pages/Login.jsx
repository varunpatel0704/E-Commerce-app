import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApiSlice.js";
import { loggedIn, loggedOut } from "../features/auth/authSlice.js";
import { useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  // useEffect(()=>{
  //   setErr(null);
  // }, [email, password])

  const dispatch = useDispatch();
  const [login, {}] = useLoginMutation();

  const disabled = !email || !password;

  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      // console.log('login request result: ',res);
      if (res?.data) {
        const { accessToken, role } = res.data;
        dispatch(loggedIn(email, role, accessToken)); //don't need to wrap data in object as payload creator will handle it
        console.log("logged in");
        setEmail("");
        setPassword("");
        navigate('/');
      }
    } catch (error) {
      dispatch(loggedOut());

      if (!error?.data) console.log("no response from server");
      else if (error.status === 401 || error.status === 404)
        console.log("invalid email/password");
      else console.log("login failed: ", error);

      setErr(error);
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
          {err?.status === 401 && (
            <p className="text-red-500">Invalid credentials</p>
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
              <Link to="/register">Sign Up</Link>
            </span>{" "}
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
