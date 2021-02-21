function rotate(array) {
    let temp = array[array.length/2];

    for(let i=array.length/2+1; i<array.length; i++) {
        array[i-1] = array[i];
    }

    array[array.length-1] = array[array.length/2-1];

    for(let i=array.length/2-1; i>0; i--) {
        array[i] = array[i-1];
    }

    array[1] = temp;
    return array;
}

function roundRobin(players){
    //Add dummy player if even number of players

    let roundRobinPlayers = [...players];

    if (roundRobinPlayers.length%2 === 1) {
        roundRobinPlayers.unshift("");
    }

    let matches = [];

    for(let i=0; i<roundRobinPlayers.length-1; i++){
        for(let j=0; j<roundRobinPlayers.length/2; j++){
            if (roundRobinPlayers[j] !== "" && roundRobinPlayers[j + roundRobinPlayers.length/2] !== "") {
                matches.push({
                    playerOne : roundRobinPlayers[j],
                    pointsPlayerOne : "",
                    playerTwo : roundRobinPlayers[j + roundRobinPlayers.length/2],
                    pointsPlayerTwo : "",
                    alreadyPlayed : false
                });
            }
        }
        roundRobinPlayers = rotate(roundRobinPlayers)
    }

    return matches;
}

export default roundRobin;