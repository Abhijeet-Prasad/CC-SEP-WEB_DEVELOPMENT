import React from 'react'
import './Popup.css'

const Popup = (props) => {
  return (props.trigger) ? (
    <div className="popup">
        <div className="modal">
            <h1>Sentiment Analysis Result</h1>
            <p>Your review was {props.sentiment}</p>
            <img src={props.image} slt=""/>
            <button className="closeBtn" onClick={() => props.setTrigger(false)}>Done</button>
        </div>
    </div>
  ) : "";
}

export default Popup