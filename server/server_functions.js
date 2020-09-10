/* eslint-disable no-plusplus */

// const { gameState } = require("./browser_functions");

function setBoardArray(gameState, rows, cols) {
  const { boardArray } = gameState;

  for (let i = 0; i < rows; i++) {
    boardArray.push([]);
    for (let j = 0; j < cols; j++) {
      boardArray[i].push(null);
    }
  }
}

function whoseTurn(gameState) {
  return gameState.nextTurn;
}

function placePiece(gameState, columnSelected) {
  const redOrYellow = whoseTurn(gameState);

  let otherPlayer = '';
  if (redOrYellow === 'red') {
    otherPlayer = 'yellow';
  } else {
    otherPlayer = 'red';
  }

  const colNum = columnSelected;
  const rows = gameState.boardArray.length;
  const cols = gameState.boardArray[0].length;

  for (let i = 0; i < rows - 1; i++) {
    const nextSpace = gameState.boardArray[i + 1][colNum];
    if (nextSpace === redOrYellow || nextSpace === otherPlayer) {
      gameState.boardArray[i][colNum] = redOrYellow;
      // updateGrid(i + 1, colNum);
      checkIfWinner(gameState, i + 1, colNum, cols);
      nextTurn(gameState);
      return gameState;
    }
  }

  const lastRow = gameState.boardArray[rows - 1];
  lastRow[colNum] = redOrYellow;
  // updateGrid(rows, colNum);
  checkIfWinner(gameState, rows, colNum, cols);
  nextTurn(gameState);
  return gameState;
}

function nextTurn(gameState) {
  if (gameState.nextTurn === 'red') {
    gameState.nextTurn = 'yellow';
  } else {
    gameState.nextTurn = 'red';
  }
}

function checkIfWinner(gameState, row, col, totalCols) {
  const totalRows = gameState.boardArray.length;
  const currentRow = gameState.boardArray[row - 1];
  console.log(row);
  let winner;

  // horizontal win
  for (let i = 0; i < currentRow.length - 3; i++) {
    if (currentRow[i] === 'red' && currentRow[i + 1] === 'red' && currentRow[i + 2] === 'red' && currentRow[i + 3] === 'red') {
      winner = 'red';
      console.log('Winner is red');
      return winner;
    }

    if (currentRow[i] === 'yellow' && currentRow[i + 1] === 'yellow' && currentRow[i + 2] === 'yellow' && currentRow[i + 3] === 'yellow') {
      winner = 'yellow';
      console.log('Winner is yellow');
      return winner;
    }
  }
  // vertical win
  for (let i = 0; i < totalRows - 3; i++) {
    if (gameState.boardArray[i][col] === 'red' && gameState.boardArray[i + 1][col] === 'red' && gameState.boardArray[i + 2][col] === 'red' && gameState.boardArray[i + 3][col] === 'red') {
      winner = 'red';
      console.log('Winner is red');
      return winner;
    }

    if (gameState.boardArray[i][col] === 'yellow' && gameState.boardArray[i + 1][col] === 'yellow' && gameState.boardArray[i + 2][col] === 'yellow' && gameState.boardArray[i + 3][col] === 'yellow') {
      winner = 'yellow';
      console.log('Winner is yellow');
      return winner;
    }
  }

  // diagonal win
}

if (typeof module !== 'undefined') {
  module.exports = {
    setBoardArray,
    whoseTurn,
    placePiece,
    nextTurn,
    checkIfWinner,
  };
}
