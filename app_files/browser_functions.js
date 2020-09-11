/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */

// const gameState = {
//   boardArray: [],
//   nextTurn: 'red',
//   scoreRed: 0,
//   scoreYellow: 0,
//   gameId: 1,
// };

// client
function updateBoard(gameState) {
  const { row } = gameState.lastPiece;
  const { col } = gameState.lastPiece;

  updateGrid(gameState, row, col);
}

function getFormSize(gameState) {
  const userInputRows = $('select#rows').val();
  const userInputCols = $('select#columns').val();
  const localGameState = gameState;
  localGameState.boardArray = [];

  const boardArray = setBoardArray(localGameState, userInputRows, userInputCols);
  drawNewGrid();
  drawArrows();
  return { boardArray, userInputRows, userInputCols };
}

function setBoardArray(gameState, rows, cols) {
  const { boardArray } = gameState;

  for (let i = 0; i < rows; i++) {
    boardArray.push([]);
    for (let j = 0; j < cols; j++) {
      boardArray[i].push(null);
    }
  }
  // send this somewhere.... needs to go back to the server to update gamestate
  return boardArray;
}

function updateGrid(gameState) {
  const { row } = gameState.lastPiece;
  const { col } = gameState.lastPiece;
  const position = $(`#row-${row}-column-${col}`).children('span');
  const redOrYellow = gameState.nextTurn;

  $(position).removeClass('whitedot');
  $(position).addClass(`${redOrYellow}dot`);
}

function drawArrows() {
  const columns = gameState.boardArray[0].length;

  // $('.grid-row').remove('span.arrow-grid');

  for (let i = 0; i < columns; i++) {
    const arrowButton = $("<span class='arrow-grid'></span").append(
      "<i class='fas fa-arrow-alt-circle-down fa-2x arrow-colour'></i>",
    );
    $('#arrow-buttons').append(arrowButton);
  }
}
// make grid of size x by y

function drawNewGrid() {
  const rows = gameState.boardArray.length;
  const columns = gameState.boardArray[0].length;

  // console.log($('#grid')[0].childNodes);
  // $('#grid').remove('div.grid-row');
  // $('#grid')[0].remove('childNodes');

  for (let i = 0; i < rows; i++) {
    const rowNum = `row-${i}`;

    const newRow = $('<div></div>')
      .attr('class', 'grid-row')
      .attr('id', rowNum);

    $('#grid').append(newRow);

    for (let j = 0; j < columns; j++) {
      const newColumn = $('<div></div>')
        .attr('id', `row-${i}-column-${j}`)
        .attr('class', 'grid-column')
        .append($("<span class='whitedot'></span>"));

      $(`#row-${i}`).append(newColumn);
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    getFormSize,
    drawNewGrid,
    drawArrows,
    updateGrid,
    updateBoard,
  };
}
