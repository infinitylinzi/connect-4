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

//   const arrowButtons = $(".arrow-grid");
//   // const arrowArray = Array.from(arrowButtons);

//   for (let i = 0; i < arrowButtons.length; i++) {
//     arrowButtons[i].addEventListener("click", () => {
//       const arrowButton = i;
//       placePiece(arrowButton);
//     });
//   }

//   // add event listener to reset button
//   $("#reset-btn").click(getFormSize);
});
