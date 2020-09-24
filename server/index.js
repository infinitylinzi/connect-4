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
  const position = gameState.lastPiece;
  gameState.winner = checkForWinner(gameState, position.row, position.col, gameState.cols);
  gameState.nextTurn = nextTurn(gameState);
  const { winner } = gameState;

  if (winner === 'red') {
    gameState.scoreRed += 1;
  } else if (winner === 'yellow') {
    gameState.scoreYellow += 1;
  }
  res.json(gameState);
});

app.post('/board', (req, res) => {
  gameState.boardArray = req.body.boardArray;
  gameState.rows = parseInt(req.body.rows, 10);
  gameState.cols = parseInt(req.body.cols, 10);
  res.json(gameState);
});

app.post('/board-reset', (req, res) => {
  gameState.boardArray = req.body.boardArray;
  gameState.rows = parseInt(req.body.rows, 10);
  gameState.cols = parseInt(req.body.cols, 10);
  gameState.gameId = parseInt(req.body.gameId, 10);
  gameState.lastPiece = req.body.lastPiece;
  gameState.winner = req.body.winner;
  gameState.turn = req.body.turn;
  gameState.scoreRed = parseInt(req.body.scoreRed, 10);
  gameState.scoreYellow = parseInt(req.body.scoreYellow, 10);
  res.json(gameState);
});

app.post('/place_piece', (req, res) => {
  gameState = placePiece(gameState, parseInt(req.body.column, 10));
  res.json(gameState);
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
