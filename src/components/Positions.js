import React from 'react';

import './Positions.css'

function Positions(props) {

  function scheduleHandler() {
    props.handler.scheduleHandler();
  }

  function nextMatchHandler() {
    props.handler.nextMatchHandler();
  }

  function createRows(){
    let newRows = props.players.map((player, index) => {
      if (index<props.players.length-1) {
      return (<tr className="positions-table-middle" key={index} style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/positions-background-middle.png)" }}>
        <td className="positions-table-data positions-table-data-name">{player.name}</td>
        <td className="positions-table-data">{player.matchesPlayed}</td>
        <td className="positions-table-data">{player.matchesWon}</td>
        <td className="positions-table-data">{player.matchesLost}</td>
        <td className="positions-table-data">{player.points}</td>
      </tr>)
      } else {
        return (<tr className="positions-table-bottom" key={index} style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/positions-background-bottom.png)" }}>
        <td className="positions-table-data positions-table-data-name">{player.name}</td>
        <td className="positions-table-data">{player.matchesPlayed}</td>
        <td className="positions-table-data">{player.matchesWon}</td>
        <td className="positions-table-data">{player.matchesLost}</td>
        <td className="positions-table-data">{player.points}</td>
      </tr>)
      }
    });
    return newRows;
  }

  return (
    <div id="positions-container">
    <p className="ribbon" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/ribbon.png)" }}>POSITIONS</p>
    <table id="positions-table">
      <thead>
        <tr id="positions-table-top" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/positions-background-top.png)" }}>
          <th className="positions-table-head" style={{ width: '50px' }}>PLAYER</th>
          <th className="positions-table-head">P</th>
          <th className="positions-table-head">W</th>
          <th className="positions-table-head">L</th>
          <th className="positions-table-head">PTS</th>
        </tr>
      </thead>
      <tbody>
        {createRows()}
      </tbody>
    </table>
    <button id="positions-schedule" onClick={scheduleHandler} style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/small-button.png)" }}>SCHEDULE</button>
    <button id="positions-next-match" onClick={nextMatchHandler} style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/small-button.png)" }}>NEXT MATCH</button>
  </div>
  );
}

export default Positions;