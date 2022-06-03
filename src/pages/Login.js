import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import Logo from "../assets/Logo.png"
import axios from 'axios';

function Login() {
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
        password: "",
    });
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(handleValidation()){
            const { password,username} = value;
            const {data}=await axios.post("http://localhost:8080/login",{
                username,
                password
            })
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
              }
              if (data.status === true) {
                localStorage.setItem("chat-app-user",JSON.stringify(data.user))
                navigate("/chat");
              }
        };
    };
    const handleValidation = () => {
        const { password, username,} = value;
        if (password ==="") {
            toast.error(
                "Email and Password is required",
                toastOptions
            );
            return false;
        } else if (username.length==="") {
            toast.error(
                "Email and Password is required",
                toastOptions
            );
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
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='brand'>
                            <img src={Logo} />
                            <h1>Smile Chat</h1>
                        </div>
                        <input type="text" placeholder='Username' name="username" onChange={(e) => handleChange(e)} min="3" />
                        <input type="password" placeholder='Password' name="password" onChange={(e) => handleChange(e)} />
                        <button type='submit'>Login</button>
                        <span>Don't have account? <Link to={"/register"}>Register</Link></span>
                    </form>
                </div>
                <ToastContainer/>
            </>
        )
    }


export default Login