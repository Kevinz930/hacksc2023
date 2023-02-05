import axios from 'axios'
import * as https from "https";
import mysql from'mysql2'
import express from 'express'
import session from 'express-session'
import path from 'path'
import { fileURLToPath } from 'url';

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

app.get('/GameName', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
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
// console.log(playerNames);


// let mysql = require('mysql')
// let conmection = mysql.createConnection({
//   host: "localhost",
//   user: "username",
//   password: "password",
//   database: "mydb"
// });
let queryString = `SELECT name FROM players`;
queryDatabase(queryString);

function queryDatabase(queryString) {
  return connection.connect(function(err) {
    if (err) throw err;
    return connection.query(queryString, (error, result, fields) => {
      if (err) throw err;
      // console.log(result);
      
      // Compare players in database with players from current match
      let dbNames = result.map(player => player.name);
      return registeredPlayers = playerNames.filter(player => dbNames.includes(player));
    });
  });
}


// run on localhost
app.listen(3000);