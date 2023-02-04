import axios from 'axios'
import * as https from "https";

// const API_KEY = 'RGAPI-2f646f6b-5115-41e9-a96d-880fe7eaccb2';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

async function getCurrentMatch() {
  const URL = `https://127.0.0.1:2999/liveclientdata/playerlist`;
  let response = await axios.get(URL, {httpsAgent});
  return getPlayerNames(response.data);
}

function getPlayerNames(data) {
  let playerNames = [];
  for (let i in data) {
    playerNames.push(data[i]['summonerName']);
  }
  return playerNames;
}

let playerNames = await getCurrentMatch();
console.log(playerNames);
