let gameState = {};

/* eslint-disable no-plusplus */
$(document).ready((event) => {
  //   event.preventDefault();
  $.get('/state', (data) => {
    gameState = data;
    console.log(gameState);
  });
  getFormSize();

  //   $("#grid-submit").submit(() => {
  //     event.preventDefault();
  //     getFormSize();
  //   });

  const arrowButtons = $('.arrow-grid');
  // const arrowArray = Array.from(arrowButtons);

  for (let i = 0; i < arrowButtons.length; i++) {
    arrowButtons[i].addEventListener('click', () => {
      const arrowButton = i;
      const body = {
        column: arrowButton,
      };
      $.ajax({
        method: 'POST',
        url: '/place_piece',
        dataType: 'json',
        data: JSON.stringify(body),
        contentType: 'application/json',
        success: (res) => {
          console.log(res);
        },
        error: (res) => {
          console.log(res);
        },
      });
    });
  }

  //   // add event listener to reset button
  //   $("#reset-btn").click(getFormSize);
});
