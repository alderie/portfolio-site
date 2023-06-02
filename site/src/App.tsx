import React from "react";
import logo from "./logo.svg";
import "./App.css";
import mySvg from "./paint.svg";
import emojiURL from './eyes.png';

function App() {
  return (
    <div className="App">
      <div className="splash">
        <h1 className="splash-text">
          <b>VICTOR</b>NOVICHKOV
        </h1>
        <div className="description">
          <div className="subtext">
            design - development - <b className="accent">magic</b>
          </div>
          <img src={mySvg} className="subtext-decor" />
        </div>
      </div>
      <div className='contact'>
        <img src={emojiURL} className='emoji'/>
        <button>contact me</button>
      </div>
      <div className='carousel'>
        <div className='project highlighted'>

        </div>
        <div className='project'>
          
        </div>
      </div>
    </div>
  );
}

export default App;
