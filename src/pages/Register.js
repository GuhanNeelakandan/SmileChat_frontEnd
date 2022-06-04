import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import Logo from "../assets/Logo.png"
import axios from 'axios';

function Register() {
    const navigate=useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const [value, setValue] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(handleValidation()){
            const { password, confirmPassword, username, email } = value;
            const {data}=await axios.post("https://smilechat-app.herokuapp.com/register",{
                username,
                email,
                password
            })
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
              }
              if (data.status === true) {
                localStorage.setItem("chat-app-user",JSON.stringify(data.user))
                navigate("/setavatar");
              }
        };
    };
    const handleValidation = () => {
        const { password, confirmPassword, username, email } = value;
        if (password !== confirmPassword) {
            toast.error(
                "Password and confirm password should be same.",
                toastOptions
            );
            return false;
        } else if (username.length < 3) {
            toast.error(
                "Username should be greater than 3 characters.",
                toastOptions
            );
            return false;
        } else if (password.length < 8) {
            toast.error(
                "Password should be equal or greater than 8 characters.",
                toastOptions
            );
            return false;
        } else if (email === "") {
            toast.error("Email is required.", toastOptions);
            return false;
        }
        return true;
    };
        const handleChange = (e) => {
            setValue({ ...value, [e.target.name]: e.target.value })
        }
        return (
            <>
                <div className='container-fluid register-page'>
                    <form className='form-input' onSubmit={(e) => handleSubmit(e)}>
                        <div className='brand'>
                            <img src={Logo} />
                            <h1>Smile Chat</h1>
                        </div>
                        <input type="text" placeholder='Username' name="username" onChange={(e) => handleChange(e)} />
                        <input type="email" placeholder='Email' name="email" onChange={(e) => handleChange(e)} />
                        <input type="password" placeholder='Password' name="password" onChange={(e) => handleChange(e)} />
                        <input type="password" placeholder='Confirm Password' name="confirmPassword" onChange={(e) => handleChange(e)} />
                        <button type='submit'>Create User</button>
                        <span>Already have account? <Link to={"/"}>Login</Link></span>
                    </form>
                </div>
                <ToastContainer/>
            </>
        )
    }


export default Register