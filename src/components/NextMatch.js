import React, { useState } from 'react';

import './NextMatch.css'

function NextMatch(props) {

  const NUMBER_REGEX = new RegExp('^[0-9]*$');
  const [scorePlayerOne, setScorePlayerOne] = useState("");
  const [scorePlayerTwo, setScorePlayerTwo] = useState("");

  function handleInput(event) {
    if (NUMBER_REGEX.test(event.target.value) || event.target.value === ""){
      if (event.target.value.length === 2 && event.target.value[0] === "0") {
        if(event.target.id === "next-match-player-one-points") {
          setScorePlayerOne(event.target.value[1]);
        } else {
          setScorePlayerTwo(event.target.value[1]);
        }
      } else {
        if(event.target.id === "next-match-player-one-points") {
          setScorePlayerOne(event.target.value);
        } else {
          setScorePlayerTwo(event.target.value);
        }
      }
    }
  }

  function backHandler(){
    props.handler.backHandler();
  }

  function applyHandler() {
    if (scorePlayerOne === "" || scorePlayerTwo === "") {
      alert("Please complete both fields before continuing");
      return;
    }
    props.handler.applyHandler(scorePlayerOne, scorePlayerTwo);
  }

  return (
    <div id="next-match-container">
    <p className="ribbon" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/ribbon.png)" }}>INSERT SCORE</p>
    <div id="next-match-match" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/match-container.png)" }}>
        <div id="next-match-player-one">
          <p className="next-match-player-name">{props.match.playerOne}</p>
          <input type="text" value={scorePlayerOne} maxLength="2" id="next-match-player-one-points" onChange={handleInput} autoComplete='off'></input>
        </div>
        <div id="next-match-player-two">
          <p className="next-match-player-name">{props.match.playerTwo}</p>
          <input type="input" value={scorePlayerTwo} maxLength="2" id="next-match-player-two-points" onChange={handleInput} autoComplete='off'></input>
        </div>
      </div>
    <button id="next-match-back" onClick={backHandler} style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/small-button.png)" }}>BACK</button>
    <button id="next-match-apply" onClick={applyHandler} style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/small-button.png)" }}>APPLY</button>
  </div>
  );
}

export default NextMatch;