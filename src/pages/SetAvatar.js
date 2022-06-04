import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loading.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function SetAvatar() {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const setProfilePic = async () => {
        if(selectedAvatar===undefined){
            toast.error("Please Select Profile pic",toastOptions);
        }else{
            const user =await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data}=await axios.post(`https://smilechat-app.herokuapp.com/setavatar/${user._id}`,{
                image:avatars[selectedAvatar],
            });
            if (data.isSet){
                user.isAvatarImageSet=true;
                user.avatarImage=data.image;
                localStorage.setItem("chat-app-user",JSON.stringify(user))
                navigate("/chat")
            }else{
                toast.error("error setting avatar.please try again",toastOptions)
            }
        }
    }
    useEffect(() => {
        async function fetchData(){
          if (!localStorage.getItem("chat-app-user")) {
            navigate("/");
          } 
        }
        fetchData();
      }, []);
    useEffect(() => {
        async function fetchData(){
            const data = []
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
        }
        fetchData();

    }, [])
    return (
        <>
        {isLoading ? <img src={loader} alt="loader" className="loader" />:
        <div className="container-fluid avatar-page">
        <div className="title-container">
            <h1>Pick an avatar as your profile pic</h1>
        </div>
        <div className="avatars">
            {avatars.map((avatar, index) => {
                return (
                    <div className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                        <img
                            className="avatar-img"
                            src={`data:image/svg+xml;base64,${avatar}`}
                            alt="avatar"
                            key={avatar}
                            onClick={() => setSelectedAvatar(index)}
                        />
                    </div>
                );
            })}
        </div>
        <button onClick={setProfilePic} className="submit-btn">
        Set as Profile Picture
      </button>
      <ToastContainer />
    </div>
        }
        
        </>
    )
}

export default SetAvatar