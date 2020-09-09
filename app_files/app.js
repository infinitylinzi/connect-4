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

  drawGrid(userInputRows, userInputCols);
  drawArrows(userInputCols);
}

// server
function whoseTurn() {
  // count number red pieces (class reddot)
  // count number yellow pieces (class yellowdot)
  // add red and yellow

  // instead of counting class instances, search through board array for each colour
  const yellowPieces = $('.reddot').length;
  const redPieces = $('.yellowdot').length;
  const totalPieces = yellowPieces + redPieces;
  // if total is even, turn=red, if total is odd, turn=yellow
  if (totalPieces % 2 === 0) {
    return 'red';
  }
  return 'yellow';
}

function arrowClick(arrowButton, event) {
  event.preventDefault();

  // define rows from gameState
  const rows = 6;
  const columnArray = [];

  for (let i = 0; i < rows; i++) {
    const columnPosition = $(`#row-${i}-column-${arrowButton}`);
    columnArray.push(columnPosition);
  }
  placePiece(columnArray);
}

function placePiece(columnArray) {
  const redOrYellow = whoseTurn();

  let otherPlayer = '';
  if (redOrYellow === 'red') {
    otherPlayer = 'yellow';
  } else {
    otherPlayer = 'red';
  }

  const colNum = columnArray[0].attr('id').charAt(columnArray[0].attr('id').length - 1);
  for (let i = 0; i < columnArray.length - 1; i++) {
    // eslint-disable-next-line max-len
    // loop through positions. Get class of inner span element. If class === reddot,
    // change class of current position
    // to reddot and break
    const thisSpace = columnArray[i];
    const nextSpace = columnArray[i + 1];

    if ($(nextSpace).children('span').hasClass(`${redOrYellow}dot`) || $(nextSpace).children('span').hasClass(`${otherPlayer}dot`)) {
      $(thisSpace).children('span').removeClass('whitedot');
      $(thisSpace).children('span').addClass(`${redOrYellow}dot`);
      checkIfWinner(i, colNum, columnArray.length);
      return;
    }
  }
  // get rows
  const rowNumber = columnArray[columnArray.length - 1].attr('id').charAt(4);
  const currentRow = $(`#row-${rowNumber}-column-${colNum}`).children('span');

  $(currentRow).removeClass('whitedot');
  $(currentRow).addClass(`${redOrYellow}dot`);

  checkIfWinner(rowNumber, colNum, columnArray.length);
}

function drawArrows(columns) {
  for (let i = 0; i < columns; i++) {
    const arrowButton = $("<span class='arrow-grid'></span").append("<i class='fas fa-arrow-alt-circle-down fa-2x arrow-colour'></i>");
    $('#arrow-buttons').append(arrowButton);
  }
}
// make grid of size x by y

function drawGrid(rows, columns) {
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

function checkIfWinner(row, col, totalCols) {
  // four same colour in a row
  // start at row0-col0
  // compare row 0-col1
  // if same compare row0-col2, row0-col3
  // return winner
  // if not same move on to row0-colnextcol
  // repeat up to start at row.length-4
  // repeat for each row
  const currentRow = [];
  for (let i = 0; i < totalCols + 1; i++) {
    if ($(`#row-${row}-column-${i}`).html().indexOf('reddot') > -1) {
      currentRow.push('red');
    } else if ($(`#row-${row}-column-${i}`).html().indexOf('yellowdot') > -1) {
      currentRow.push('yellow');
    } else {
      currentRow.push(null);
    }
  }
  const rowLength = currentRow.length;
  let winner;

  for (let i = 0; i < rowLength - 3; i++) {
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

    // four same colour in a column

  // four same colour in a diagonal
  }
}

// function resetClick() {
//   numRows = 6;
//   numColumns = 7;
// }
window.onload = (event) => {
  event.preventDefault();
  // drawGrid(6, 7);
  // drawArrows(7);

  $('#grid-submit').submit((event) => {
    event.preventDefault();
    getFormSize();
  });

  // eslint-disable-next-line no-use-before-define

  // eslint-disable-next-line no-undef
  const arrowButtons = $('.arrow-grid');

  const arrowArray = Array.from(arrowButtons);

  for (let i = 0; i < arrowArray.length; i++) {
    arrowArray[i].addEventListener('click', () => {
      const arrowButton = i;
      // eslint-disable-next-line no-restricted-globals
      arrowClick(arrowButton, event);
    });
  }
};

// add event listener to reset button
// $('#reset-btn').click(resetClick);

// eslint-disable-next-line no-global-assign

module.exports = {
  getFormSize,
  arrowClick,
  drawGrid,
  drawArrows,
};
