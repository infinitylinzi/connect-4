const express = require('express');
const { parseJSON } = require('jquery');
const {
  setBoardArray,
  whoseTurn,
  placePiece,
  nextTurn,
  checkForWinner,
} = require('./server_functions');
const { getFormSize } = require('../app_files/browser_functions');

let gameState = {
  rows: 0,
  cols: 0,
  boardArray: [],
  turn: 'red',
  scoreRed: 0,
  scoreYellow: 0,
  gameId: 1,
  lastPiece: {
    row: 0,
    col: 0,
  },
  winner: null,
};

const app = express();

app.use(express.static('./app_files'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/state', (req, res) => {
  res.json(gameState);
});

app.get('/winner', (req, res) => {
  res.json(gameState);
});

app.post('/board', (req, res) => {
  gameState.boardArray = req.body.boardArray;
  gameState.rows = parseInt(req.body.rows, 10);
  gameState.cols = parseInt(req.body.cols, 10);
  res.json(gameState);
});

app.post('/place_piece', (req, res) => {
  gameState = placePiece(gameState, parseInt(req.body.column, 10));
  res.json(gameState);
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
