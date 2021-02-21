import React, { useState } from 'react';

import './NumberPlayers.css';

function NumberPlayers(props) {

  const [numberPlayers, setNumberPlayers] = useState(3)

  function increase() {
    if (numberPlayers < 20) {
      setNumberPlayers(prevNumberPlayers => prevNumberPlayers + 1)
    }
  }

  function decrease() {
    if (numberPlayers > 3) {
      setNumberPlayers(prevNumberPlayers => prevNumberPlayers - 1)
    }
  }

  function newLeagueHandler() {
    props.handler.newLeagueHandler(numberPlayers);
  }

  function continueHandler() {
    props.handler.continueHandler();
  }

  return (
    <div id="number-players-container">
      <div id="number-players-box" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/players-container.png)" }}>
        <p id="numberPlayers">{numberPlayers}</p>
        <div id="number-players-button-container">
          <button id="number-players-up" onClick={increase} style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/up-button.png)" }}></button>
          <br />
          <button id="number-players-down" onClick={decrease} style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/down-button.png)" }}></button>
        </div>
      </div>
      <button id="number-players-new-league" onClick={newLeagueHandler} style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/big-button.png)" }}>NEW LEAGUE</button>
      <button id="number-players-continue" onClick={continueHandler} style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/big-button.png)" }}>CONTINUE</button>
    </div>
  );
}

export default NumberPlayers;