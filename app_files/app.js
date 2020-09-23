let gameState = {};

/* eslint-disable no-plusplus */
$(() => {
  //   event.preventDefault();
  $.get('/state', (data) => {
    gameState = data;
  });

  let formSize = getFormSize(gameState);

  const body = {
    rows: formSize.userInputRows,
    cols: formSize.userInputCols,
    boardArray: formSize.boardArray,
  };

  $('#grid-submit').submit((event) => {
    event.preventDefault();
    formSize = getFormSize(gameState);

    body.rows = formSize.userInputRows;
    body.cols = formSize.userInputCols;
    body.boardArray = formSize.boardArray;
    bindArrowEventListeners(body);

    $.ajax({
      method: 'POST',
      url: '/board',
      dataType: 'json',
      data: JSON.stringify(body),
      contentType: 'application/json',
      error: (res) => {
        // eslint-disable-next-line no-console
        console.log(res);
      },
    });
  });

  bindArrowEventListeners(body);

  $.ajax({
    method: 'POST',
    url: '/board',
    dataType: 'json',
    data: JSON.stringify(body),
    contentType: 'application/json',
    error: (res) => {
      // eslint-disable-next-line no-console
      console.log(res);
    },
  });

  $('#new-game-btn').click(() => {
    gameState = newGame(gameState);

    body.boardArray = gameState.boardArray;
    body.rows = gameState.rows;
    body.cols = gameState.cols;
    body.gameId = gameState.gameId;
    body.lastPiece = gameState.lastPiece;
    body.winner = gameState.winner;
    bindArrowEventListeners(body);
    $.ajax({
      method: 'POST',
      url: '/board',
      dataType: 'json',
      data: JSON.stringify(body),
      contentType: 'application/json',
      error: (res) => {
        // eslint-disable-next-line no-console
        console.log(res);
      },
    });
  });

  //   // add event listener to reset button
  $('#reset-btn').click(() => {
    $('select#rows').val(6);
    $('select#cols').val(7);
    gameState = newGame(gameState);

    body.boardArray = gameState.boardArray;
    body.rows = gameState.rows;
    body.cols = gameState.cols;
    body.gameId = 0;
    body.lastPiece = gameState.lastPiece;
    body.winner = gameState.winner;
    body.turn = 'red';
    body.scoreRed = 0;
    body.scoreYellow = 0;

    $('.red-score').text(`Red: ${body.scoreRed} `);
    $('.yellow-score').text(`Yellow: ${body.scoreYellow} `);

    bindArrowEventListeners(body);
    $.ajax({
      method: 'POST',
      url: '/board-reset',
      dataType: 'json',
      data: JSON.stringify(body),
      contentType: 'application/json',
      error: (res) => {
        // eslint-disable-next-line no-console
        console.log(res);
      },
    });
  });
});

const bindArrowEventListeners = (body) => {
  const arrowButtons = $('.arrow-grid');
  arrowButtons.click((e) => {
    const buttonClicked = e.currentTarget.id;
    const arrowButton = buttonClicked.charAt(buttonClicked.length - 1);
    body.column = arrowButton;
    $.ajax({
      method: 'POST',
      url: '/place_piece',
      dataType: 'json',
      data: JSON.stringify(body),
      contentType: 'application/json',
      success: (res) => {
        gameState = res;
        updateGrid(gameState);
        $.get('/winner', (data) => {
          gameState = data;
          if (gameState.winner) {
            updateUiWinner(gameState);
          } else {
            updateUiTurn(gameState.turn);
          }
        });
      },
      error: (res) => {
        // eslint-disable-next-line no-console
        console.log(res);
      },
    });
  });
};
