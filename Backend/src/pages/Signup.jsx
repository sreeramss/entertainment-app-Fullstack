import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import logo from "../assets/logo.svg";
import { signupAPICall } from "../api";

const Signup = () => {
  const navigate = useNavigate(); // Navigation hook for redirection

  const [email, setEmail] = useState(""); // State for email input field
  const [password, setPassword] = useState(""); // State for password input field
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password input field
  const [emailError, setEmailError] = useState(""); // State for email validation error message
  const [passwordError, setPasswordError] = useState(""); // State for password validation error message
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // State for confirm password validation error message

  // Handler for email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value) setEmailError("");
  };

  // Handler for password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) setPasswordError("");
  };

  // Handler for confirm password input change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value) setConfirmPasswordError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    let valid = true; // Flag to track form validation status

    // Validate email field
    if (!email) {
      setEmailError("Can't be empty");
      valid = false;
    }

    // Validate password field
    if (!password) {
      setPasswordError("Can't be empty");
      valid = false;
    }

    // Validate confirm password field
    if (!confirmPassword) {
      setConfirmPasswordError("Can't be empty");
      valid = false;
    }

    // Check if passwords match
    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    }

    // If form is valid, proceed with signup API call
    if (valid) {
      try {
        const res = await signupAPICall({ username: email, password: password }); // Call signup API
        toast.success("Signup successful!"); // Display success toast
        navigate("/"); // Redirect to home page on successful signup
      } catch (e) {
        toast.error("An error occurred during signup. Please try again."); // Display error toast
        console.error(e); // Log error to console
      }
    } else {
      // Display validation error messages
      if (emailError) toast.error(emailError);
      if (passwordError) toast.error(passwordError);
      if (confirmPasswordError) toast.error(confirmPasswordError);
    }
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-20">
      <img src={logo} alt="logo" className="h-10 w-12" /> {/* Logo */}
      <div className="w-72 rounded-lg bg-col-light p-6 sm:w-96">
        <h2 className="mb-6 text-2xl text-white">Sign Up</h2>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="relative flex flex-row-reverse">
            <input
              className={`w-full text-white/75 bg-transparent outline-none border-b-2 pb-2 border-opacity-20 focus:border-opacity-70 placeholder:text-col-icons focus:placeholder:text-white focus:placeholder:text-opacity-60 placeholder:pl-2 ${
                emailError
                  ? "border-b-col-red border-opacity-80"
                  : " border-b-white"
              }`}
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
            />
            {emailError && (
              <span className="absolute text-red-500 text-sm">
                {emailError}
              </span>
            )}
          </div>

          {/* Password input field */}
          <div className="relative flex flex-row-reverse">
            <input
              className={`w-full text-white/75 bg-transparent outline-none border-b-2 pb-2 border-opacity-20 focus:border-opacity-70 placeholder:text-col-icons focus:placeholder:text-white focus:placeholder:text-opacity-60 placeholder:pl-2 ${
                passwordError
                  ? "border-b-col-red border-opacity-80"
                  : " border-b-white"
              }`}
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
            {passwordError && (
              <span className="absolute text-red-500 text-sm">
                {passwordError}
              </span>
            )}
          </div>

          {/* Confirm Password input field */}
          <div className="relative flex flex-row-reverse">
            <input
              className={`w-full text-white/75 bg-transparent outline-none border-b-2 pb-2 border-opacity-20 focus:border-opacity-70 placeholder:text-col-icons focus:placeholder:text-white focus:placeholder:text-opacity-60 placeholder:pl-2 ${
                confirmPasswordError
                  ? "border-b-col-red border-opacity-80"
                  : " border-b-white"
              }`}
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password"
            />
            {confirmPasswordError && (
              <span className="absolute text-red-500 text-sm">
                {confirmPasswordError}
              </span>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-col-red px-4 py-2 text-white outline-none hover:bg-white hover:text-black"
          >
            Create Account
          </button>

          {/* Login link */}
          <h3 className="mx-auto text-base text-white text-opacity-75">
            Already have an account?
            <span
              className="cursor-pointer text-col-red"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </h3>
        </form>
      </div>
    </main>
  );
};

export default Signup;
