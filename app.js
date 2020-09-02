//function to place a piece
//when arrow clicked piece appears at last empty position in that coloumn

let numRows = 6
let numColumns = 7

drawGrid();

const arrowButtons = $(".arrow-grid")

const arrowArray = Array.from(arrowButtons)

for(let i=0; i<arrowArray.length; i++){
  
  arrowArray[i].addEventListener('click', function(){
    let arrowButton = i
    
    arrowClick(arrowButton, event)
    
  })
}

function arrowClick(arrowButton, event){
  
  event.preventDefault()
  
  const rows = numRows
  
  const columnArray = []
  
  for(let i=0; i<rows; i++){
    let columnPosition = $("#row-" +i + "-column-" + arrowButton)
    columnArray.push(columnPosition)
    console.log(columnArray)
  
      }

      for (let i=0; i<columnArray.length-1; i++){
        //loop through positions. Get class of inner span element. If class === reddot, change class of current position
        //to reddot and break
        let thisSpace = columnArray[i]
        let nextSpace = columnArray[i+1]

        if($(nextSpace).children("span").hasClass("reddot")) {
          $(thisSpace).children("span").removeClass("whitedot")
          $(thisSpace).children("span").addClass("reddot")
          break
      }

        }
        
        const rowNumber = String(rows-1)
        let currentRow = $("#row-"+rowNumber+"-column-"+arrowButton).children("span")

        $(currentRow).removeClass("whitedot")
        $(currentRow).addClass("reddot")
        
        
      }



//make grid of size x by y


function drawGrid() {
  let rows = numRows;
  let columns = numColumns;

  for (let i = 0; i < columns; i++) {
//     let arrowButton = $(
//       "<span><div class='arrow-grid'><i class='fas fa-arrow-alt-circle-down fa-2x arrow-colour'></i></div></span>"
//     );

let arrowButton = $("<span class='arrow-grid'></span").append("<div></div>").append("<i class='fas fa-arrow-alt-circle-down fa-2x arrow-colour'></i>")
    $("#arrow-buttons").append(arrowButton);
  }

  for (let i = 0; i < rows; i++) {
    let rowNum = "row-" + i;

    let newRow = $("<div></div>").attr("class", "grid-row").attr("id", rowNum);

    $("#grid").append(newRow);


    for (let j = 0; j < columns; j++) {
      //$(selector).attr({attribute:value, attribute:value,...})

      let newColumn = $("<div></div>")
        .attr("class", "grid-column")
        .attr("id", "row-" + i + "-column-" + j)
        .append($("<span class='whitedot'></span>"));

      $("#row-" + i).append(newColumn);

    }
  }
}


// function resetClick(){
//   numRows=6
//   numColumns=7
//   drawGrid()
// }


//add event listener to reset button
// document.getElementById("reset-btn").addEventListener('click', resetClick)

