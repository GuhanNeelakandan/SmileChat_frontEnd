import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ChatContainer from '../components/ChatContainer';
import Contact from '../components/Contact';
import Welocome from '../components/Welocome';
import {io} from "socket.io-client"
function Chat() {
  const navigate=useNavigate()
  const socket=useRef()
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const[isLoaded,setIsLoaded]=useState(false);


  useEffect(() => {
    async function fetchData(){
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem("chat-app-user")
          )
        );
        setIsLoaded(true)
      }
    }
    fetchData();
  }, []);
  useEffect(()=>{
    if(currentUser){
      socket.current=io("http://localhost:8080");
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser])

  useEffect(() => {
    async function fetchData(){
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`https://smilechat-app.herokuapp.com/allusers/${currentUser._id}`);
          setContacts(data.data);
          console.log(data)
        } else {
          navigate("/setAvatar");
        }
      }
    }
    fetchData();  
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="conatiner-fluid chat-container">
      <div className="container mt-5">
          <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
          {
            isLoaded && currentChat===undefined ? (<Welocome currentUser={currentUser}/>):
            (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>)
          }
      </div>
    </div>
  )
}

export default Chat