/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
// function to place a piece

// const { red } = require('chalk');

// when arrow clicked piece appears at last empty position in that coloumn
const gameState = {
  boardArray: [],
  nextTurn: 'red',
  scoreRed: 0,
  scoreYellow: 0,
  gameId: 1,
};

// client
function getFormSize() {
  const userInputRows = $('select#rows').val();
  const userInputCols = $('select#columns').val();

  setBoardArray(userInputRows, userInputCols);
  drawNewGrid();
  drawArrows();
}

function updateGrid(row, column) {
  const position = $(`#row-${row}-column-${column}`).children('span');
  const redOrYellow = whoseTurn();

  $(position).removeClass('whitedot');
  $(position).addClass(`${redOrYellow}dot`);
}

function drawArrows() {
  const columns = gameState.boardArray[0].length;
  for (let i = 0; i < columns; i++) {
    const arrowButton = $("<span class='arrow-grid'></span").append("<i class='fas fa-arrow-alt-circle-down fa-2x arrow-colour'></i>");
    $('#arrow-buttons').append(arrowButton);
  }
}
// make grid of size x by y

function drawNewGrid() {
  const rows = gameState.boardArray.length;
  const columns = gameState.boardArray[0].length;

  for (let i = 0; i < rows; i++) {
    const rowNum = `row-${i}`;

    const newRow = $('<div></div>').attr('class', 'grid-row').attr('id', rowNum);

    $('#grid').append(newRow);

    for (let j = 0; j < columns; j++) {
      // $(selector).attr({attribute:value, attribute:value,...})

      const newColumn = $('<div></div>')
        .attr('id', `row-${i}-column-${j}`)
        .attr('class', 'grid-column')
        .append($("<span class='whitedot'></span>"));

      $(`#row-${i}`).append(newColumn);
    }
  }
}
// server side functions

function setBoardArray(rows, cols) {
  const { boardArray } = gameState;

  for (let i = 0; i < rows; i++) {
    boardArray.push([]);
    for (let j = 0; j < cols; j++) {
      boardArray[i].push(null);
    }
  }
}

function whoseTurn() {
  return gameState.nextTurn;
}

function placePiece(columnSelected) {
  const redOrYellow = whoseTurn();

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
      updateGrid(i, colNum);
      checkIfWinner(i, colNum, cols);
      nextTurn();
      return;
    }
  }

  const lastRow = gameState.boardArray[rows - 1];
  lastRow[colNum] = redOrYellow;

  updateGrid(lastRow, colNum);
  checkIfWinner(lastRow, colNum, cols);
  nextTurn();
}

function nextTurn() {
  if (gameState.nextTurn === 'red') {
    gameState.nextTurn = 'yellow';
  } else {
    gameState.nextTurn = 'red';
  }
}

function checkIfWinner(row, col, totalCols) {
  const currentRow = gameState.boardArray[row];
  const totalRows = gameState.boardArray.length;
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

window.onload = (event) => {
  event.preventDefault();
  getFormSize();
};

$('#grid-submit').submit((event) => {
  event.preventDefault();
  getFormSize();
});

const arrowButtons = $('.arrow-grid');
const arrowArray = Array.from(arrowButtons);
console.log(arrowArray);

for (let i = 0; i < arrowButtons.length; i++) {
  arrowButtons[i].addEventListener('click', () => {
    const arrowButton = i;
    console.log('i was clicked');
    placePiece(arrowButton);
  });
}

// add event listener to reset button
$('#reset-btn').click(getFormSize);

module.exports = {
  getFormSize,
  drawNewGrid,
  drawArrows,
  placePiece,
  checkIfWinner,
};
