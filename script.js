import axios from 'axios'
import * as https from "https";
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes

// const API_ KEY = 'RGAPI-2f646f6b-5115-41e9-a96d-880fe7eaccb2';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
async function getCurrentMatch() {
  const URL = `https://127.0.0.1:2999/liveclientdata/playerlist`;
  let response = await axios.get(URL, {httpsAgent});
  let players = getPlayers(response.data);
  return players

}

function getPlayers(data) {  
  console.log(data);
  let players = 
  {
    'team1': {},
    'team2': {}
  }
  for (let i in data) {
    let playerName = data[i]['summonerName'];
    if (data[i]['team'] == 'ORDER') {
      players['team1'][playerName] = false;
    } else {
      players['team2'][playerName] = false;
    }
  }
  // let teams = [];
  // for (let i in data) {
  //   teams.push(data[i][['summonerName'], ['team']]);
  // }
  return players;
}

foq 

let playerList = await getCurrentMatch();
console.log(playerList);

// let table1 = document.getElementById('table1');
// let thead1 = document.getElementById('thead1');
// for (let player in playerList['team1']) {
//   let row = table1.insertRow();
//   let cell = row.insertCell();
//   cell.appendChild(player.constructor.name);
// }


// let mysql = require('mysql')
// let conmection = mysql.createConnection({
//   host: "localhost",
//   user: "username",
//   password: "password",
//   database: "mydb"
// });
// let queryString = `SELECT name FROM players`;
// queryDatabase(queryString);

// function queryDatabase(queryString) {
//   return connection.connect(function(err) {
//     if (err) throw err;
//     return connection.query(queryString, (error, result, fields) => {
//       if (err) throw err;
//       // console.log(result);
      
//       // Compare players in database with players from current match
//       let dbNames = result.map(player => player.name);
//       return registeredPlayers = playerNames.filter(player => dbNames.includes(player));
//     });
//   });
// }