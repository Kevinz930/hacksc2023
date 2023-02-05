import axios from 'axios'
import * as https from "https";
import mysql from'mysql2'
import express, { text } from 'express'
import session from 'express-session'
import path from 'path'
import { fileURLToPath } from 'url';
import { table } from 'console';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// const mysql = require('mysql2');
// const express = require('express');
// const session = require('express-session');
// const path = require('path');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'HamamaSonder@359',
	database : 'nodelogin',
  	port: '3306'
});

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/static')));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// // If the user is logged in
	// if (request.session.loggedin) {
	// 	// Output username
	// 	response.send('Welcome back, ' + request.session.username + '!');
	// } else {
	// 	// Not logged in
	// 	response.send('Please login to view this page!');
	// }
	// response.end();
	response.sendFile(path.join(__dirname + '/game_select.html'));
});

app.post('/check', function(request, response) {
	response.redirect('/GameName');
	response.end();
});

// app.post('/GameName', async function(request, response) {
// 	const result = await queryDatabase();
// 	response.send("Angel Shot Players in lobby: " + compareDB(result));
// 	response.end();
// });

// app.get('/GameName', async function(request, response) {
// 	response.sendFile(path.join(__dirname + '/match.html'));
// 	const result = await queryDatabase();
// 	// const table = await compareDB();
// 	response.send("Angel Shot Players in lobby: " + compareDB(result));
// 	// console.log(compareDB(result));
// 	response.end()
// });

// app.get('/GameName', function(request, response) {
// 	// response.sendFile(path.join(__dirname + '/match.html'));
// });

// app.post('/GameName', async function(request,response){
// 	const result = await queryDatabase();
// 	const message = compareDB(result);
// 	response.send({body:message});
// 	response.end();
// });

app.get('/GameName', async function(request, response) {
	const result = await queryDatabase();
	const message = compareDB(result);
	const playerString = '';
	for (let player in message) {
		playerString += `<li>${player}</li>`;
	}
	response.set('Content-Type', 'text/html');
	response.send(`<html><body><ul>${playerString}</ul></body></html>`);

  	// response.send("<html><body><h1>" + stringVariable + "</h1></body></html>");
	// response.send("<html><body><div>" + stringVariable1 + "<p style='color:red'>" + message + "</h2>" + stringVariable2 + "</div></body></html>");

});

console.log("Go to http://localhost:3000");

// ###############
// const API_KEY = 'RGAPI-2f646f6b-5115-41e9-a96d-880fe7eaccb2';

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
	// console.log(data);
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
  
  
  let playerList = await getCurrentMatch();
//   console.log(playerList);
  let queryString = `SELECT playerName FROM players`;
  const promise = queryDatabase(queryString);
  promise.then((value) => {
	// console.log(value);
	compareDB(value);
	// return table;
  });
  
  function queryDatabase(queryString, playerList2) {
	let sql = 'SELECT playerName from players;';
  	return new Promise((resolve, reject) => {
    	connection.query(sql, (err, result) => {
      		if (err) {
        		reject(err);
      		}	
			else {
				resolve(result);
			}
		});
	});
}

function compareDB (db_result) {

	// // Compare players in database with players from current match
	// let dbNames = db_result.map(player => player.name);
	// console.log(dbNames);
	// // for (let team in playerList2) {
	// // 	for (let player in team) {
	// // 		if (dbNames.includes(player.constructor.names)) {
	// // 			team[player] = true;
	// // 		}
	// // 	}
	// // }
	// // return registeredPlayers = playerList.filter(player => dbNames.includes(player));
	// console.log(playerList);

	// console.log(db_result);
	let db_arr = [];

	for (let object in db_result) {
		db_arr.push(db_result[object]['playerName']);
	}

	// console.log(db_arr);
	let team1 = [];
	let team2 = [];

	// let dbNames = db_result.map(player => player.playerName);
	for (let player in playerList['team1']) {
		// console.log(Object.keys(playerList[team]));
		if (db_arr.includes(player)) {
			team1.push(player);
		}
	}

	for (let player in playerList['team2']) {
		// console.log(Object.keys(playerList[team]));
		if (db_arr.includes(player)) {
			team2.push(player);
		}
	}
	let team_list = team1.concat(team2);
	return team_list;

}

// run on localhost
app.listen(3000);