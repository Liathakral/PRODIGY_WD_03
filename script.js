let gameboard= [
['','',''],
['','',''],
['','','']
];
let text2 = document.getElementById("text2");
let choices= ['X','O'];
let humanplayer ;
function random(){
    let choice = Math.floor(Math.random() * choices.length)
    humanplayer= choices[choice] ;
}

let currentplayer= humanplayer;
let ai ;
random();
let opponent;
function startGame(opponentType) {
    opponent = opponentType;
    text2.innerText = `You are playing against ${opponent}`;
  }
let cell = document.getElementsByClassName('cell');
function placeMark(cell){

if (cell.innerText===''){
    if (humanplayer === choices[0]){
        ai=choices[1];
        
    }else{
        ai=choices[0]
    }

    currentplayer= currentplayer===humanplayer? ai :humanplayer;
      cell.innerText= currentplayer;
        
        // Update the gameboard with the human's move
        let row = cell.parentNode.rowIndex;
        let col = cell.cellIndex;
        gameboard[row][col]= currentplayer;
        // Check for a win or tie after the human's move
        checkForWin();
        if (opponent ==='AI'){
        smartplayer();
      
        }
       
      
       
    }
   

}

function smartplayer() {
    if (currentplayer === humanplayer) {
      let availableCells = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (gameboard[i][j] === '') {
            availableCells.push({ row: i, col: j });
          }
        }
      }
      let randomIndex = Math.floor(Math.random() * availableCells.length);
      let { row, col } = availableCells[randomIndex];
      gameboard[row][col] = ai;
      cell[row*3+col].innerText = ai;
      checkForWin();
      currentplayer= currentplayer===humanplayer? ai :humanplayer;
    }
  }
  
function checkForWin(){

    for (let i = 0; i < 3; i++) {
        if (gameboard[i][0] !== '' && gameboard[i][0] === gameboard[i][1] && gameboard[i][0] === gameboard[i][2]) {
         text2.innerHTML= `${gameboard[i][0]} wins!`;
         setTimeout(resetAndClearMessage, 2500);
          resetBoard();
          return;
        }
        if (gameboard[0][i] !== '' && gameboard[0][i] === gameboard[1][i] && gameboard[0][i] === gameboard[2][i]) {
            text2.innerHTML= `${gameboard[0][i]} wins!`;
            setTimeout(resetAndClearMessage, 2500);
          resetBoard();
          return;
        }
      }
      if (gameboard[0][0] !== '' && gameboard[0][0] === gameboard[1][1] && gameboard[0][0] === gameboard[2][2]) {
        text2.innerHTML= `${gameboard[0][0]} wins!`;
        setTimeout(resetAndClearMessage, 2500);
        resetBoard();
        return;
      }
      if (gameboard[0][2] !== '' && gameboard[0][2] === gameboard[1][1] && gameboard[0][2] === gameboard[2][0]) {
        text2.innerHTML= `${gameboard[0][2]} wins!`;
        setTimeout(resetAndClearMessage, 2500);
        resetBoard();
        return;
      }
      
      if (!gameboard.flat().includes('')) {
        text2.innerHTML='It\'s a tie!';
        resetBoard();
      }

}
function resetBoard(){
    
        document.querySelectorAll('.cell').forEach(cell => {
          cell.innerText = '';
        });
      
      
     gameboard= [
        ['','',''],
        ['','',''],
        ['','','']
        ];
}
function resetAndClearMessage() {
    resetBoard();
    text2.innerHTML = '';
  }