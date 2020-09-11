let gameState = {};

/* eslint-disable no-plusplus */
$(document).ready(() => {
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
  // const arrowArray = Array.from(arrowButtons);

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
          updateGrid(res);
        },
        error: (res) => {
          // eslint-disable-next-line no-console
          console.log(res);
        },
      });
    });
  }

  //   // add event listener to reset button
  //   $("#reset-btn").click(getFormSize);
});
