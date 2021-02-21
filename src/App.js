import React, { useState, useEffect } from 'react';
import './App.css';

import NumberPlayers from './components/NumberPlayers'
import PlayersNames from './components/PlayersNames'
import Schedule from './components/Schedule'
import Positions from './components/Positions'
import NextMatch from './components/NextMatch'

import roundRobin from './RoundRobin'

function App() {

  const [currentScreen, setCurrentScreen] = useState("numberPlayers")

  const [prevScreen, setPrevScreen] = useState("schedule")

  const [numberPlayers, setNumberPlayers] = useState(3);

  const [players, setPlayers] = useState([]);
  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem('players', JSON.stringify(players));
    }
  }, [players]);

  const [matches, setMatches] = useState([]);
  useEffect(() => {
    if (matches.length > 0) {
      localStorage.setItem('matches', JSON.stringify(matches));
    }
  }, [matches]);

  const [nextMatch, setNextMatch] = useState();

  const [actualNextMatch, setActualNextMatch] = useState();
  useEffect(() => {
    if (actualNextMatch !== undefined) {
      localStorage.setItem('actualNextMatch', actualNextMatch);
    }
  }, [actualNextMatch]);

  function numberPlayersNewLeagueHandler(userNumberPlayers) {
    setNumberPlayers(userNumberPlayers);

    //Set new screen
    setCurrentScreen("playersNames");
  }

  function numberPlayersContinueHandler() {
    if (localStorage.length > 0) {
      setCurrentScreen("positions");
      setPlayers(JSON.parse(localStorage.getItem('players')));
      setMatches(JSON.parse(localStorage.getItem('matches')));
      setNextMatch(parseInt(localStorage.getItem('actualNextMatch')));
      setActualNextMatch(parseInt(localStorage.getItem('actualNextMatch')));
    } else {
      alert("There is no league saved to continue");
    }
  }

  function playersNamesHandler(playersNames) {
    //Random name order
    let ctr = playersNames.length;
    let temp;
    let index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = playersNames[ctr];
      playersNames[ctr] = playersNames[index];
      playersNames[index] = temp;
    }

    //Set players
    setPlayers((prevPlayers) => {
      for (let i = 0; i < numberPlayers; i++) {
        prevPlayers[i] = {};
        prevPlayers[i].name = playersNames[i];
        prevPlayers[i].matchesPlayed = 0;
        prevPlayers[i].matchesWon = 0;
        prevPlayers[i].matchesLost = 0;
        prevPlayers[i].points = 0;
      }
      let newPlayers = [...prevPlayers]
      return newPlayers;
    });

    //Set nextMatches
    setActualNextMatch(0);
    setNextMatch(0);

    //Create matches array
    setMatches(roundRobin(playersNames));

    //Set new screen
    setCurrentScreen("schedule");
  }

  function schedulePositionsHandler() {
    setCurrentScreen("positions")
  }

  function scheduleNextMatchHandler() {
    setPrevScreen("schedule");
    if (nextMatch < matches.length) { setCurrentScreen("nextMatch"); }
  }

  function scheduleAlreadyPlayedHandler(index) {
    setNextMatch(index);
    setPrevScreen("schedule");
    setCurrentScreen("nextMatch");
  }

  function positionsScheduleHandler() {
    setCurrentScreen("schedule");
  }

  function positionsNextMatchHandler() {
    setPrevScreen("positions");
    if (nextMatch < matches.length) { setCurrentScreen("nextMatch") }
  }

  function nextMatchBackHandler() {
    setNextMatch(actualNextMatch);
    setCurrentScreen(prevScreen);
  }

  //Use score to sort players
  function sortPlayers(a, b) {
    if (a.points > b.points) return -1;
    if (b.points > a.points) return 1;
    return 0;
  }

  function nextMatchApplyHandler(scorePlayerOne, scorePlayerTwo) {

    let funcNextMatch = nextMatch;
    let funcActualNextMatch = actualNextMatch;
    let funcMatches = [...matches];
    let funcPlayers = [...players];

    let playerOne = funcPlayers.find(obj => obj.name === funcMatches[funcNextMatch].playerOne);
    let playerTwo = funcPlayers.find(obj => obj.name === funcMatches[funcNextMatch].playerTwo);

    //Si nextMatch !== del verdadero nextMatch, deshacer cambios de los players basados en el resultado antiguo
    if (funcNextMatch !== funcActualNextMatch) {
      if (funcMatches[funcNextMatch].pointsPlayerOne > funcMatches[funcNextMatch].pointsPlayerTwo) {
        playerOne.points = playerOne.points - 2;
        playerOne.matchesPlayed = playerOne.matchesPlayed - 1;
        playerOne.matchesWon = playerOne.matchesWon - 1;
        if (funcMatches[funcNextMatch].pointsPlayerTwo > 14) {
          playerTwo.points = playerTwo.points - 1;
        }
        playerTwo.matchesPlayed = playerTwo.matchesPlayed - 1;
        playerTwo.matchesLost = playerTwo.matchesLost - 1;
      } else {
        playerTwo.points = playerTwo.points - 2;
        playerTwo.matchesPlayed = playerTwo.matchesPlayed - 1;
        playerTwo.matchesWon = playerTwo.matchesWon - 1;
        if (funcMatches[funcNextMatch].pointsPlayerOne > 14) {
          playerOne.points = playerOne.points - 1;
        }
        playerOne.matchesPlayed = playerOne.matchesPlayed - 1;
        playerOne.matchesLost = playerOne.matchesLost - 1;
      }
    }

    //Update players according to new result
    if (scorePlayerOne > scorePlayerTwo) {
      playerOne.points = playerOne.points + 2;
      playerOne.matchesPlayed = playerOne.matchesPlayed + 1;
      playerOne.matchesWon = playerOne.matchesWon + 1;
      if (scorePlayerTwo > 14) {
        playerTwo.points = playerTwo.points + 1;
      }
      playerTwo.matchesPlayed = playerTwo.matchesPlayed + 1;
      playerTwo.matchesLost = playerTwo.matchesLost + 1;
    } else {
      playerTwo.points = playerTwo.points + 2;
      playerTwo.matchesPlayed = playerTwo.matchesPlayed + 1;
      playerTwo.matchesWon = playerTwo.matchesWon + 1;
      if (scorePlayerOne > 14) {
        playerOne.points = playerOne.points + 1;
      }
      playerOne.matchesPlayed = playerOne.matchesPlayed + 1;
      playerOne.matchesLost = playerOne.matchesLost + 1;
    }

    funcPlayers.sort(sortPlayers);
    setPlayers(funcPlayers);

    //Use score to update match
    setMatches((prevMatches) => {
      prevMatches[funcNextMatch].pointsPlayerOne = scorePlayerOne;
      prevMatches[funcNextMatch].pointsPlayerTwo = scorePlayerTwo;
      prevMatches[funcNextMatch].alreadyPlayed = true;
      return [...prevMatches];
    });

    
    if (funcActualNextMatch === funcNextMatch) {
    setActualNextMatch(funcActualNextMatch + 1);
    }
    setNextMatch(() => {
      if (funcActualNextMatch === funcNextMatch) {
        return funcNextMatch + 1;
      }
      return funcActualNextMatch;
    });

    //Set currentScreen
    setCurrentScreen(prevScreen);
  }

  function renderScreen() {
    switch (currentScreen) {
      case "numberPlayers":
        return <NumberPlayers handler={{ newLeagueHandler: numberPlayersNewLeagueHandler, continueHandler: numberPlayersContinueHandler }} />
      case "playersNames":
        return <PlayersNames handler={playersNamesHandler} numberPlayers={numberPlayers} />
      case "schedule":
        return <Schedule handler={{ positionsHandler: schedulePositionsHandler, nextMatchHandler: scheduleNextMatchHandler, alreadyPlayedHandler: scheduleAlreadyPlayedHandler }} matches={matches} />
      case "positions":
        return <Positions handler={{ scheduleHandler: positionsScheduleHandler, nextMatchHandler: positionsNextMatchHandler }} players={players} />
      case "nextMatch":
        return <NextMatch handler={{ backHandler: nextMatchBackHandler, applyHandler: nextMatchApplyHandler }} match={matches[nextMatch]} />
      default:
        return;
    }
  }

  return (
    <div className="App" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/imgs/racket.png)" }}>
      {renderScreen()}
    </div>
  );
}

export default App;