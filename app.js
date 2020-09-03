/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
// function to place a piece
// when arrow clicked piece appears at last empty position in that coloumn

function getFormSize() {
  const userInputRows = $('#rows').value;
  const userInputCols = $('#columns').value;

  $('#grid-submit').click((event) => {
    event.preventDefault();
    drawGrid(userInputRows, userInputCols);
  });
}

function arrowClick(arrowButton, event) {
  event.preventDefault();

  // define rows with user input rows

  const columnArray = [];

  for (let i = 0; i < rows; i++) {
    const columnPosition = $(`#row-${i}-column-${arrowButton}`);
    columnArray.push(columnPosition);
    console.log(columnArray);
  }

  for (let i = 0; i < columnArray.length - 1; i++) {
    // eslint-disable-next-line max-len
    // loop through positions. Get class of inner span element. If class === reddot,
    // change class of current position
    // to reddot and break
    const thisSpace = columnArray[i];
    const nextSpace = columnArray[i + 1];

    if ($(nextSpace).children('span').hasClass('reddot')) {
      $(thisSpace).children('span').removeClass('whitedot');
      $(thisSpace).children('span').addClass('reddot');
      break;
    }
  }

  const rowNumber = String(rows - 1);
  const currentRow = $(`#row-${rowNumber}-column-${arrowButton}`).children('span');

  $(currentRow).removeClass('whitedot');
  $(currentRow).addClass('reddot');
}

// make grid of size x by y

function drawGrid(rows, columns) {
  for (let i = 0; i < columns; i++) {
    const arrowButton = $("<span class='arrow-grid'></span").append('<div></div>').append("<i class='fas fa-arrow-alt-circle-down fa-2x arrow-colour'></i>");
    $('#arrow-buttons').append(arrowButton);
  }

  for (let i = 0; i < rows; i++) {
    const rowNum = `row-${i}`;

    const newRow = $('<div></div>').attr('class', 'grid-row').attr('id', rowNum);

    $('#grid').append(newRow);

    for (let j = 0; j < columns; j++) {
      // $(selector).attr({attribute:value, attribute:value,...})

      const newColumn = $('<div></div>')
        .attr('id', `row-${i}-column-${j}`)
        .append($("<span class='whitedot'></span>"));

      $(`#row-${i}`).append(newColumn);
    }
  }
}

// function resetClick() {
//   numRows = 6;
//   numColumns = 7;
// }

getFormSize();

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

// add event listener to reset button
// $('#reset-btn').click(resetClick);
