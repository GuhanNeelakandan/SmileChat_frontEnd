import React, { useEffect, useState } from 'react'
import Logo from "../assets/Logo.png"
import Logout from './Logout';

function Contact({ contacts, currentUser,changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    useEffect(() => {
        async function fetchData(){
            const data = await JSON.parse(
                localStorage.getItem("chat-app-user")
              );
              setCurrentUserName(data.username);
              setCurrentUserImage(data.avatarImage);
        }
        fetchData();
      }, []);
      const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
      };
    return (
        <div className='contact-container'>
            <div className="contact-brand">
                <div className='chat-heading'>
                <img className="contact-logo" src={Logo} />
                <h4>SmileChat</h4>
                </div>
                
                <div className='current-user mb-4'>
                    <div className="current-avatar">
                        <img 
                        className='current-img'
                            src={`data:image/svg+xml;base64,${currentUserImage}`}
                            alt="avatar"
                        />
                    </div>
                    <div className="contact-username">
                        <h2>{currentUserName}</h2>
                    </div>
                    <Logout/>
                </div>
                <div className='contacts'>
                    {
                        contacts.map((contact, index) => {
                            return (
                                <div
                                    key={contact._id}
                                    className={`contact ${index === currentSelected ? "selected" : ""}`}
                                    onClick={() => changeCurrentChat(index, contact)}
                                    >
                                     
                                    <div className="contact-avatar">
                                        <img className='avatar-img' src={`data:image/svg+xml;base64,${contact.avatarImage}`} />
                                    </div>
                                    <div className="contact-username">
                                        <h5 className="text-white text-uppercase">{contact.username}</h5>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Contact