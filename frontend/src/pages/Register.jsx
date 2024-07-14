import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../features/auth/authApiSlice.js";
import { loggedIn, loggedOut } from "../features/auth/authSlice.js";
import toast from "react-hot-toast";


function Register() {
  // const [fullName, setFullName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [passwordMatch, setPasswordMatch] = useState(false);
  // const [err, setErr] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    passwordMatch: false,
    err: null,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const prevLocation = location.state?.from?.pathname;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, err: null, [name]: value });
  };

  const dispatch = useDispatch();
  const [signUp, {}] = useSignUpMutation();

  const disabled = [
    formData.fullName,
    formData.email,
    formData.password,
    formData.confirmPassword,
    formData.passwordMatch,
  ].some((field) => !field);

  useEffect(() => {
    const res = formData.password === formData.confirmPassword;
    setFormData({ ...formData, passwordMatch: res });
  }, [formData.confirmPassword, formData.password]);

  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      const res = await signUp({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      if (res?.data) {

        const { accessToken, role } = res.data;
        dispatch(loggedOut());
        dispatch(loggedIn(formData.fullName, formData.email, role, accessToken));
        console.log("signed up ", res);
        toast.success(`Welcome ${formData.fullName}`);

        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          passwordMatch: false,
          err: null,
        });

        navigate(prevLocation || '/');
      }
    } catch (error) {

      setFormData({ ...formData, err: error });
      if (!error?.data) console.log("no response from server");
      else console.log(error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-12">
      <h1 className="text-5xl relative">
        <Link to="/">Logo</Link>
      </h1>

      <div className="flex flex-col justify-center items-center gap-5 border rounded-md sm:w-[30%] w-[80%] p-5 shadow-md">
        <h2 className="w-full p-0.5 text-2xl text-center font-medium text-black text-opacity-70">
          Sign Up
        </h2>
        <form
          onSubmit={(e) => {
            if (disabled) {
              alert("Please provide all the details");
              return;
            }
            handleSubmit(e);
          }}
          className="flex flex-col gap-5 w-full"
        >
          <input
            className="input-base-style w-full"
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            minLength={5}
            title="Minimum 5 characters"
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
            minLength={8}
            maxLength={24}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            title="Minimum 8 characters"
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
          {formData.password &&
            formData.confirmPassword &&
            !formData.passwordMatch && (
              <p className="text-red-500">Passwords do not match</p>
            )}
          {formData.err?.status === 409 && (
            <p className="text-red-500">This email is already registered</p>
          )}
          <button
            // disabled={disabled}
            type="submit"
            className="public-site-btn rounded shadow py-2.5 mt-5"
            // onClick={}
          >
            Sign Up
          </button>

          <p className="text-sm ">
            Already have an account?{" "}
            <span className="text-blue-500">
              <Link to="/login">Login</Link>
            </span>{" "}
          </p>
        </form>
      </div>
    </main>
  );
}

export default Register;
