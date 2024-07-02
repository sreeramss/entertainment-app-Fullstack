import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import logo from "../assets/logo.svg";
import { loginAPICall , initializeAPI } from "../api";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(""); // State for email input
    const [password, setPassword] = useState(""); // State for password input
    const [emailError, setEmailError] = useState(""); // State for email validation error
    const [passwordError, setPasswordError] = useState(""); // State for password validation error

    // Check if user is already logged in based on token in localStorage
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token !== null) {
            console.log(token);
            navigate("/home"); // Redirect to home if token exists
        }
    }, [navigate, token]);

    // Handle email input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value) setEmailError(""); // Clear email error on input change
    };

    // Handle password input change
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value) setPasswordError(""); // Clear password error on input change
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;

        // Validate email input
        if (!email) {
            setEmailError("Can't be empty");
            valid = false;
        }

        // Validate password input
        if (!password) {
            setPasswordError("Can't be empty");
            valid = false;
        }

        // If inputs are valid, attempt login API call
        if (valid) {
            try {
                const res = await loginAPICall({ username: email, password: password });
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token); // Store token in localStorage
                    toast.success("Login successful!"); // Display success toast
                    initializeAPI(); // Initialize API after setting the token
                    console.log("Login successful and API initialized.");
                    navigate("/home"); // Redirect to home page on successful login
                } else {
                    toast.error(res.data.message || "Login failed!"); // Display error toast from API response
                }
            } catch (error) {
                toast.error("An error occurred during login. Please try again."); // Display generic error toast on exception
                console.error(error);
            }
        } else {
            // Display validation error toasts if inputs are invalid
            if (emailError) toast.error(emailError);
            if (passwordError) toast.error(passwordError);
        }
    };

    return (
        <main className="flex h-screen w-full flex-col items-center justify-center gap-20 ">
            <img src={logo} alt="logo" className="h-10 w-12" /> {/* Application logo */}
            <div className="w-72 rounded-lg bg-col-light p-6 sm:w-96"> {/* Login form container */}
                <h2 className="mb-6 text-2xl text-white">Login</h2> {/* Login form title */}
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}> {/* Login form */}
                    {/* Email input field */}
                    <div className="relative flex flex-row-reverse">
                        <input
                            className={`w-full text-white/75 bg-transparent outline-none border-b-2 pb-2 border-opacity-20 focus:border-opacity-70 placeholder:text-col-icons focus:placeholder:text-white focus:placeholder:text-opacity-60 placeholder:pl-2 ${emailError ? "border-b-col-red border-opacity-80" : " border-b-white"}`}
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
                            className={`w-full text-white/75 bg-transparent outline-none border-b-2 pb-2 border-opacity-20 focus:border-opacity-70 placeholder:text-col-icons focus:placeholder:text-white focus:placeholder:text-opacity-60 placeholder:pl-2 ${passwordError ? "border-b-col-red border-opacity-80" : " border-b-white"}`}
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

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer rounded-lg bg-col-red px-4 py-2 text-white outline-none hover:bg-white hover:text-black"
                    >
                        Login to your account
                    </button>

                    {/* Link to signup */}
                    <h3 className="mx-auto text-base text-white text-opacity-75">
                        Don't have an account?{" "}
                        <span
                            className="cursor-pointer text-col-red"
                            onClick={() => navigate("/register")}
                        >
                            Sign Up
                        </span>
                    </h3>
                </form>
            </div>
        </main>
    );
};

export default Login;
