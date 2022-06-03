import React, { useState } from 'react'
import { IoMdSend } from "react-icons/io";
function ChatInput({handleSendMsg}) {
    const [msg, setMsg] = useState("");
    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
          handleSendMsg(msg);
          setMsg("");
        }
      };
    return (
        <>
            <form className='type-container' onSubmit={(event) => sendChat(event)}>
                <input type="text" name='message' placeholder='Type Your Message' onChange={(e) => setMsg(e.target.value)}
                    value={msg} />
                <button className='submit'>
                    <IoMdSend />
                </button>
            </form>
        </>
    )
}

export default ChatInput