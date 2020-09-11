/* eslint-disable no-plusplus */

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
      checkIfWinner(gameState, i + 1, colNum, cols);
      nextTurn(gameState);
      gameState.lastPiece.row = i;
      gameState.lastPiece.col = colNum;
      return gameState;
    }
  }

  const lastRow = gameState.boardArray[rows - 1];
  lastRow[colNum] = redOrYellow;

  checkIfWinner(gameState, rows, colNum, cols);
  nextTurn(gameState);
  gameState.lastPiece.row = rows - 1;
  gameState.lastPiece.col = colNum;
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
// use winner to increment score in gamestate (server)
// send winner to browser to display win banner, update UI
  // diagonal win
}

if (typeof module !== 'undefined') {
  module.exports = {
    whoseTurn,
    placePiece,
    nextTurn,
    checkIfWinner,
  };
}
