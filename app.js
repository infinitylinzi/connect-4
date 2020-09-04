/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
// function to place a piece
// when arrow clicked piece appears at last empty position in that coloumn

function getFormSize() {
  const userInputRows = $('input#rows').value;
  const userInputCols = $('input#columns').value;

  drawGrid(userInputRows, userInputCols);
}

function whoseTurn() {
  // count number red pieces (class reddot)
  // count number yellow pieces (class yellowdot)
  // add red and yellow
  const yellowPieces = $('.reddot').length;
  const redPieces = $('.yellowdot').length;
  const totalPieces = yellowPieces + redPieces;
  console.log(yellowPieces);
  // if total is even, turn=red, if total is odd, turn=yellow
  if (totalPieces % 2 === 0) {
    return 'red';
  }
  return 'yellow';
}

function arrowClick(arrowButton, event) {
  event.preventDefault();

  // define rows with user input rows
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
  console.log(redOrYellow);
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
      // checkIfWinner();
      return;
    }
  }
  // get rows
  const rowNumber = columnArray[columnArray.length - 1].attr('id').charAt(columnArray[0].attr('id').length - 10);
  const currentRow = $(`#row-${rowNumber}-column-${colNum}`).children('span');

  $(currentRow).removeClass('whitedot');
  $(currentRow).addClass(`${redOrYellow}dot`);
//  checkIfWinner();
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

function checkIfWinner(){
  // four same colour in a row

  // four same colour in a column

  // four same colour in a diagonal
}

// function resetClick() {
//   numRows = 6;
//   numColumns = 7;
// }
window.onload = (event) => {
  event.preventDefault();
  drawGrid(6, 7);
  drawArrows(7);

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
// module = module || {};
// module.exports = {
//   getFormSize,
//   arrowClick,
//   drawGrid,
//   drawArrows,
// };
