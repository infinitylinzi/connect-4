/* eslint-disable no-plusplus */

function whoseTurn(gameState) {
  const localGameState = gameState;
  return localGameState.turn;
}

function placePiece(gameState, columnSelected) {
  const localGameState = gameState;
  const redOrYellow = whoseTurn(localGameState);
  let otherPlayer = '';
  if (redOrYellow === 'red') {
    otherPlayer = 'yellow';
  } else {
    otherPlayer = 'red';
  }

  const colNum = columnSelected;
  const rows = localGameState.boardArray.length;
  const cols = localGameState.boardArray[0].length;

  for (let i = 0; i < rows - 1; i++) {
    const nextSpace = localGameState.boardArray[i + 1][colNum];
    if (nextSpace === redOrYellow || nextSpace === otherPlayer) {
      localGameState.boardArray[i][colNum] = redOrYellow;
      localGameState.winner = checkForWinner(localGameState, i + 1, colNum, cols);
      localGameState.turn = nextTurn(localGameState);
      localGameState.lastPiece.row = i;
      localGameState.lastPiece.col = colNum;
      return localGameState;
    }
  }

  const lastRow = localGameState.boardArray[rows - 1];
  lastRow[colNum] = redOrYellow;

  localGameState.winner = checkForWinner(localGameState, rows, colNum, cols);
  localGameState.turn = nextTurn(localGameState);
  localGameState.lastPiece.row = rows - 1;
  localGameState.lastPiece.col = colNum;
  return localGameState;
}

function nextTurn(gameState) {
  const localGameState = gameState;
  if (localGameState.turn === 'red') {
    localGameState.turn = 'yellow';
  } else {
    localGameState.turn = 'red';
  }
  return localGameState.turn;
}

function checkForWinner(gameState, row, col, totalCols) {
  const localGameState = gameState;
  console.log(gameState.turn);
  const totalRows = localGameState.boardArray.length;
  const currentRow = localGameState.boardArray[row - 1];

  // horizontal win
  for (let i = 0; i < currentRow.length - 3; i++) {
    if (currentRow[i] === 'red' && currentRow[i + 1] === 'red' && currentRow[i + 2] === 'red' && currentRow[i + 3] === 'red') {
      localGameState.winner = 'red';
      console.log('winner is red');
      return localGameState.winner;
    }

    if (currentRow[i] === 'yellow' && currentRow[i + 1] === 'yellow' && currentRow[i + 2] === 'yellow' && currentRow[i + 3] === 'yellow') {
      localGameState.winner = 'yellow';
      console.log('winner is yellow');
      return localGameState.winner;
    }
  }
  // vertical win
  for (let i = 0; i < totalRows - 3; i++) {
    if (gameState.boardArray[i][col] === 'red' && gameState.boardArray[i + 1][col] === 'red' && gameState.boardArray[i + 2][col] === 'red' && gameState.boardArray[i + 3][col] === 'red') {
      localGameState.winner = 'red';
      console.log('winner is red');
      return localGameState.winner;
    }

    if (gameState.boardArray[i][col] === 'yellow' && gameState.boardArray[i + 1][col] === 'yellow' && gameState.boardArray[i + 2][col] === 'yellow' && gameState.boardArray[i + 3][col] === 'yellow') {
      localGameState.winner = 'yellow';
      console.log('winner is yellow');
      return localGameState.winner;
    }
  }
  // use winner to increment score in gamestate (server)
  // send winner to browser to display win banner, update UI
  // diagonal win
  localGameState.winner = null;
  return localGameState.winner;
}

if (typeof module !== 'undefined') {
  module.exports = {
    whoseTurn,
    placePiece,
    nextTurn,
    checkForWinner,
  };
}
