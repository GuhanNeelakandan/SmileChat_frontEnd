import React from 'react'
import { useNavigate } from 'react-router-dom';
import {BiPowerOff}from "react-icons/bi"
import { Button } from 'bootstrap';


function Logout() {
    const navigate = useNavigate();
    const handleClick= async()=>{
        localStorage.clear();
        navigate("/");
    }
  return (
    <button className='btn-sm' onClick={handleClick}>
        <BiPowerOff/> 
    </button>
  )
}

export default Logout