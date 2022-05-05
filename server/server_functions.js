/* eslint-disable no-plusplus */

const e = require('express');

const whoseTurn = (gameState) => {
  const localGameState = gameState;
  return localGameState.turn;
};

const placePiece = (gameState, columnSelected) => {
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
      // localGameState.winner = checkForWinner(localGameState, i + 1, colNum, cols);
      // localGameState.turn = nextTurn(localGameState);
      localGameState.lastPiece.row = i;
      localGameState.lastPiece.col = colNum;
      return localGameState;
    }
  }

  const lastRow = localGameState.boardArray[rows - 1];
  lastRow[colNum] = redOrYellow;

  // localGameState.winner = checkForWinner(localGameState, rows, colNum, cols);
  // localGameState.turn = nextTurn(localGameState);
  localGameState.lastPiece.row = rows - 1;
  localGameState.lastPiece.col = colNum;
  return localGameState;
};

const nextTurn = (gameState) => {
  const localGameState = gameState;
  if (localGameState.turn === 'red') {
    localGameState.turn = 'yellow';
  } else {
    localGameState.turn = 'red';
  }
  return localGameState.turn;
};

const checkForWinner = (gameState, row, col, totalCols) => {
  const localGameState = gameState;
  const board = localGameState.boardArray;
  const totalRows = localGameState.boardArray.length;
  const currentRow = localGameState.boardArray[row];
  const positionColumn = col;
  // horizontal win
  for (let i = 0; i < currentRow.length - 3; i++) {
    if (currentRow[i] === 'red' && currentRow[i + 1] === 'red' && currentRow[i + 2] === 'red' && currentRow[i + 3] === 'red') {
      localGameState.winner = 'red';
      return localGameState.winner;
    }

    if (currentRow[i] === 'yellow' && currentRow[i + 1] === 'yellow' && currentRow[i + 2] === 'yellow' && currentRow[i + 3] === 'yellow') {
      localGameState.winner = 'yellow';
      return localGameState.winner;
    }
  }
  // vertical win
  for (let i = 0; i < totalRows - 3; i++) {
    if (board[i][positionColumn] === 'red' && board[i + 1][positionColumn] === 'red' && board[i + 2][positionColumn] === 'red' && board[i + 3][positionColumn] === 'red') {
      localGameState.winner = 'red';
      return localGameState.winner;
    }

    if (board[i][positionColumn] === 'yellow' && board[i + 1][positionColumn] === 'yellow' && board[i + 2][positionColumn] === 'yellow' && board[i + 3][positionColumn] === 'yellow') {
      localGameState.winner = 'yellow';
      return localGameState.winner;
    }
  }
  // diagonal win
  const positionRow = row;
  const maxCols = totalCols;
  const maxRows = totalRows - 1;
  const topLeftArray = [];
  const bottomLeftArray = [];

  // // make an array
  // // starting position = currentrow, currentcol

  // // move -1 col, -1 row until

  // // bl-tr
  // // array from col0 or rowmax to row0 or colmax
  // // move +1row +1col, push position to array
  let positionToCheckRow = positionRow - 1;
  let positionToCheckColumn = positionColumn + 1;

  while (positionToCheckRow < maxRows && positionToCheckColumn > 0) {
    positionToCheckRow += 1;
    positionToCheckColumn -= 1;
  }

  while (positionToCheckRow > 0 && positionToCheckColumn < maxCols) {
    bottomLeftArray.push({ row: positionToCheckRow, col: positionToCheckColumn });
    positionToCheckRow -= 1;
    positionToCheckColumn += 1;
  }

  if (bottomLeftArray.length > 3) {
    const arrayToCheck = [];
    for (let i = 0; i < bottomLeftArray.length; i++) {
      const rowPosition = bottomLeftArray[i].row;
      const columnPosition = bottomLeftArray[i].col;
      arrayToCheck.push(board[rowPosition][columnPosition]);
    }
    let count = 0;
    for (let i = 0; i < arrayToCheck.length; i++) {
      if (arrayToCheck[i] === 'red' && arrayToCheck[i + 1] === 'red') {
        count += 1;
        if (count === 3) {
          localGameState.winner = 'red';
          count = 0;
          return localGameState.winner;
        }
      }
    }

    for (let i = 0; i < arrayToCheck.length; i++) {
      if (arrayToCheck[i] === 'yellow' && arrayToCheck[i + 1] === 'yellow') {
        count += 1;
        if (count === 3) {
          localGameState.winner = 'yellow';
          count = 0;
          return localGameState.winner;
        }
      }
    }
  }

  positionToCheckRow = positionRow;
  positionToCheckColumn = positionColumn;

  // // move -1 col, -1 row until

  // // tl-br
  // // array from col0 or row0 to colmax or rowmax
  // // move +1 row, +1 col, push position to array
  while (positionToCheckRow > 0 && positionToCheckColumn > 0) {
    positionToCheckRow -= 1;
    positionToCheckColumn -= 1;
  }

  while (positionToCheckRow < maxRows && positionToCheckColumn < maxCols) {
    topLeftArray.push({ row: positionToCheckRow, col: positionToCheckColumn });
    positionToCheckRow += 1;
    positionToCheckColumn += 1;
  }

  // // if array.length < 4 return
  if (topLeftArray.length > 3) {
    const arrayToCheck = [];
    for (let i = 0; i < topLeftArray.length; i++) {
      const rowPosition = topLeftArray[i].row;
      const columnPosition = topLeftArray[i].col;
      arrayToCheck.push(board[rowPosition][columnPosition]);
    }
    let count = 0;
    for (let i = 0; i < arrayToCheck.length; i++) {
      if (arrayToCheck[i] === 'red' && arrayToCheck[i + 1] === 'red') {
        count += 1;
        if (count === 3) {
          localGameState.winner = 'red';
          count = 0;
          return localGameState.winner;
        }
      }
    }

    for (let i = 0; i < arrayToCheck.length; i++) {
      if (arrayToCheck[i] === 'yellow' && arrayToCheck[i + 1] === 'yellow') {
        count += 1;
        if (count === 3) {
          localGameState.winner = 'yellow';
          count = 0;
          return localGameState.winner;
        }
      }
    }
  }
  // check array for four in a row as above

  localGameState.winner = null;
  return localGameState.winner;
};

if (typeof module !== 'undefined') {
  module.exports = {
    whoseTurn,
    placePiece,
    nextTurn,
    checkForWinner,
  };
}
