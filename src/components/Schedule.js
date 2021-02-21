import React from 'react';

import './Schedule.css';

function Schedule(props) {

  function alreadyPlayedHandler(event) {
    props.handler.alreadyPlayedHandler(event.currentTarget.id);
  }
  
  function createMatches() {
    return props.matches.map((match, index) => (
      <div key={index} id={index} className={'schedule-match ' + (match.alreadyPlayed ? 'schedule-match-played' : null)} onClick={match.alreadyPlayed ? alreadyPlayedHandler : null} style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/match-container.png)" }}>
        <div className="schedule-player-one">
          <p className="schedule-player-name">{match.playerOne}</p>
          <p className="schedule-player-points">{match.pointsPlayerOne}</p>
        </div>
        <div className="schedule-player-two">
          <p className="schedule-player-name">{match.playerTwo}</p>
          <p className="schedule-player-points">{match.pointsPlayerTwo}</p>
        </div>
      </div>
    ));
  }

  function positionsHandler() {
    props.handler.positionsHandler();
  }

  function nextMatchHandler() {
    props.handler.nextMatchHandler();
  }

  return (
    <div id="schedule-container">
      <p className="ribbon" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/ribbon.png)" }}>SCHEDULE</p>
      <div id="schedule-matches-container">
        {createMatches()}
      </div>
      <button id="schedule-positions" onClick={positionsHandler} style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/small-button.png)" }}>POSITIONS</button>
      <button id="schedule-next-match" onClick={nextMatchHandler} style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/small-button.png)" }}>NEXT MATCH</button>
    </div>
  )
}

export default Schedule;