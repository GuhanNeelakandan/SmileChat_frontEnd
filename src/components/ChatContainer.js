import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import ChatInput from './ChatInput'
import Logout from './Logout'
import Message from './Message'
import { v4 as uuidv4 } from "uuid";

function ChatContainer({ currentChat, currentUser, socket }) {
    const scrollRef = useRef();
    const [messages, setMessages] = useState([])
    const [arrival, setArraival] = useState(null)
    useEffect(() => {
        async function fetchData() {
            if(currentChat){
                const response = await axios.post('http://localhost:8080/getmsg', {
                from: currentUser._id,
                to: currentChat._id,
            })
            setMessages(response.data);
            }
        }
        fetchData()
    }, [currentChat])
    const handleSendMsg = async (msg) => {
        await axios.post('http://localhost:8080/addmsg', {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        })
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg
        });
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs)
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArraival({ fromSelf: false, message: msg });
            })
        }
    }, []);

    useEffect(() => {
        arrival && setMessages((prev) => [...prev, arrival])
    }, [arrival]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (
        <>
            {
                currentChat && (
                    <div className="message-container">
                        <div className='chat-header'>
                            <div className='user-details'>
                                <div className='chat-avatar'>
                                    <img className='avatar-img' src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} />
                                </div>
                                <div className="chat-username">
                                    <h4>{currentChat.username}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="chat-msg">
                            {
                                messages.map((message) => {
                                    return (
                                        <div ref={scrollRef} key={uuidv4()}>
                                            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                                <div className='content'>
                                                    <p>
                                                        {message.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <ChatInput handleSendMsg={handleSendMsg} />
                    </div>
                )
            }
        </>
    )
}

export default ChatContainer