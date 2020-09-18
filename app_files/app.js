let gameState = {};

/* eslint-disable no-plusplus */
$(() => {
  //   event.preventDefault();
  $.get('/state', (data) => {
    gameState = data;
  });

  const formSize = getFormSize(gameState);

  const body = {
    rows: formSize.userInputRows,
    cols: formSize.userInputCols,
    boardArray: formSize.boardArray,
  };
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

  //   $("#grid-submit").submit(() => {
  //     event.preventDefault();
  //     getFormSize();
  //   });

  const arrowButtons = $('.arrow-grid');

  for (let i = 0; i < arrowButtons.length; i++) {
    // eslint-disable-next-line no-loop-func
    arrowButtons[i].addEventListener('click', () => {
      const arrowButton = i;
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
  }

  $('#new-game-btn').click(() => {
    gameState = newGame(gameState);

    body.boardArray = gameState.boardArray;
    body.rows = gameState.rows;
    body.cols = gameState.cols;
    body.gameId = gameState.gameId;
    body.lastPiece = gameState.lastPiece;
    body.winner = gameState.winner;
    console.log(body);
  });
  //   // add event listener to reset button
  //   $("#reset-btn").click(getFormSize);
});
