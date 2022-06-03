import React from 'react'
import Robo from "../assets/Robot.png"

function Welocome({currentUser}) {
  return (
    <div className="welcome-container">
        <img className="welcome-robo" src={Robo}/>
        <h4>Welcome, <span className='welcome-user'>{currentUser.username}!</span></h4>
        <h5 className="welcome-note">Please select a chat to Start messaging.</h5>
    </div>
  )
}

export default Welocome