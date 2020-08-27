//function to place a piece
//when arrow clicked piece appears at last empty position in that coloumn


function placePiece(){

    function handleClick(){

        //detect which arrow has been clicked
        function handleClick(arrowClicked){

            const rows = document.getElementsByClassName("grid-row")

            for(let i=0; i<rows.length; i++){
                let columnToPlace = document.querySelectorAll("row-" +i + "-column-" + arrowClicked)

                for (let j=0; j<columnToPlace.length; j++){
                    let nextSpace = document.getElementById("row-" +i + "-column-" + j+1)

                    if(nextSpace.style.color !== "white"){
                        columnToPlace[j].style.color = "red"
                    }
                }

            }
        }

        //loop through positions. On each iteration look ahead to next position. If not empty change colour of
//current position to red/yellow depending on turn

    //place event listener on arrows
    const arrowArray = document.querySelectorAll("div.arrow-grid")
    console.log(arrowArray)

    for(let i=0; i<arrowArray.length; i++){
      let arrowClicked = i
      console.log(arrowClicked)
      arrowArray[i].addEventListener('click', handleClick)
    }

}
}

//make grid of size x by y

function drawGrid(x, y) {
  let rows = x;
  let columns = y;

  for (let i = 0; i < columns; i++) {
    let arrowButton = document.createElement("span");
    arrowButton.innerHTML =
      "<div class='arrow-grid'><i class='fas fa-arrow-alt-circle-down fa-2x arrow-colour'></i></div>";
    document.getElementById("arrow-buttons").appendChild(arrowButton);
  }

  for (let i = 0; i < rows; i++) {
    let newRow = document.createElement("div");
    newRow.setAttribute("class", "grid-row");
    newRow.setAttribute("id", "row-" + i);
    document.getElementById("grid").appendChild(newRow);
    for (let j = 0; j < columns; j++) {
      let newColumn = document.createElement("div");
      newColumn.innerHTML = "<span class='dot'></span>";
      newColumn.setAttribute("class", "grid-column");
      newColumn.setAttribute("id", "row-" + i + "-column-" + j);
      document.getElementById("row-" + i).appendChild(newColumn);
    }
  }
}

drawGrid(3, 8);
