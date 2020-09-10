const express = require('express');
const {
  setBoardArray,
  whoseTurn,
  placePiece,
  nextTurn,
  checkIfWinner,
} = require('./server_functions');
const { parseJSON } = require('jquery');

let gameState = {
  boardArray: [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  nextTurn: 'red',
  scoreRed: 0,
  scoreYellow: 0,
  gameId: 1,
};

const app = express();

app.use(express.static('./app_files'));
app.use(express.json());

// app.get('/hello', (req, res) => {
//   res.send('hello world');
// });

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/state', (req, res) => {
  res.json(gameState);
});

// let body = {
//   column: 0,
// };

app.post('/place_piece', (req, res) => {
  gameState = placePiece(gameState, parseInt(req.body.column, 10));
  console.log(gameState);
  res.json(gameState);
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
