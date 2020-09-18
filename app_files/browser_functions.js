/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */

function getFormSize(gameState) {
  const userInputRows = $('select#rows').val();
  const userInputCols = $('select#columns').val();
  const localGameState = gameState;
  localGameState.boardArray = [];

  removeGrid();
  const boardArray = setBoardArray(localGameState, userInputRows, userInputCols);
  drawNewGrid(boardArray);
  drawArrows(userInputCols);
  return { boardArray, userInputRows, userInputCols };
}

function removeGrid() {
  $('.grid-row').remove('div.grid-column');
  $('#grid').remove('div.grid-row');
  console.log($('#grid'));
  $('.grid-row').remove('span.arrow-grid');
}

function setBoardArray(gameState, rows, cols) {
  const localGameState = gameState;

  localGameState.boardArray = [];

  for (let i = 0; i < rows; i++) {
    localGameState.boardArray.push([]);
    for (let j = 0; j < cols; j++) {
      localGameState.boardArray[i].push(null);
    }
  }
  // send this somewhere.... needs to go back to the server to update gamestate
  return localGameState.boardArray;
}

function updateGrid(gameState) {
  const { row } = gameState.lastPiece;
  const { col } = gameState.lastPiece;
  const position = $(`#row-${row}-column-${col}`).children('span');
  const redOrYellow = gameState.turn;

  $(position).removeClass('whitedot');
  $(position).addClass(`${redOrYellow}dot`);
}

function drawArrows(columns) {
  // $('.grid-row').remove('span.arrow-grid');

  for (let i = 0; i < columns; i++) {
    const arrowButton = $("<span class='arrow-grid'></span").append(
      "<i class='fas fa-arrow-alt-circle-down fa-2x arrow-colour'></i>",
    );
    $('#arrow-buttons').append(arrowButton);
  }
}
// make grid of size x by y

function drawNewGrid(boardArray) {
  const rows = boardArray.length;
  const columns = boardArray[0].length;

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

function updateUiTurn(turn) {
  // change outline counter
  if (turn === 'red') {
    $('.circle-yellow').removeClass('turn-outline');
    $('.circle-red').addClass('turn-outline');
  } else {
    $('.circle-red').removeClass('turn-outline');
    $('.circle-yellow').addClass('turn-outline');
  }
}

function updateUiWinner(gameState) {
  const { winner } = gameState;
  const redScore = gameState.scoreRed;
  const yellowScore = gameState.scoreYellow;
  alert(`The winner is ${winner}`);
  // update score
  $('.red-score').text(`Red: ${redScore} `);
  $('.yellow-score').text(`Yellow: ${yellowScore} `);
}

function newGame(gameState) {
  const localGameState = gameState;
  const formSize = getFormSize(gameState);
  localGameState.boardArray = formSize.boardArray;
  localGameState.rows = formSize.userInputRows;
  localGameState.cols = formSize.userInputCols;
  localGameState.gameId += 1;
  localGameState.lastPiece.row = 0;
  localGameState.lastPiece.col = 0;
  localGameState.winner = null;

  return localGameState;
}

if (typeof module !== 'undefined') {
  module.exports = {
    getFormSize,
    drawNewGrid,
    drawArrows,
    updateGrid,
    updateUiWinner,
    updateUiTurn,
    setBoardArray,
    newGame,
  };
}
