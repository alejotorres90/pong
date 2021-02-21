import React, {useState} from 'react';

import './PlayersNames.css';

function PlayersNames(props) {

  const [playersNames, setPlayersNames] = useState([]);

  function handleInput(event) {
    setPlayersNames((prevPlayersNames) => {prevPlayersNames[event.target.id] = event.target.value; return prevPlayersNames});
  }

  function continueHandler() {
    for (let i=0; i<props.numberPlayers; i++) {
      if (playersNames[i] === undefined || playersNames[i] === "") {
        alert("Please complete all the names before continuing");
        return;
      }
    }
    props.handler(playersNames);
  }

  function renderInputs() {
    let inputs = []
    for (let i=0; i<props.numberPlayers; i++) {
      inputs.push(<input type="text" maxLength="7" value={playersNames[i]} className='players-names-input' id={i} key={i} onChange={handleInput} autoComplete='off' style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/name-container.png)" }} />);
    }
    return inputs;
  }

  return (
    <div id="players-names-container">
      <p className="ribbon" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/ribbon.png)" }}>ENTER THE NAMES</p>
      <div id="players-names-input-container">
        {renderInputs()}
      </div>
      <button id="players-names-continue" onClick={continueHandler} style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/small-button.png)" }}>CONTINUE</button>
    </div>
  );
}

export default PlayersNames;