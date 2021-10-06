// const lTetrimonio = 'firstShape'
// const zTetromino = 'secondShape'
// const oTetromino = 'thirdShape'
// const iTetromino = 'fourthShape'
// const tTetromino = 'fifthShape'

// const tetrominoes = [lTetrimonio, zTetromino, oTetromino, 
//                     iTetromino, tTetromino];

                    
const width = 10; 
const grid = document.querySelector('.grid');
let squares = Array.from( document.querySelectorAll('.grid div') );//squares is array of all .grid divs
const ScoreDisplay = document.querySelector('#score');//access score and start-button ids
const StartBtn = document.querySelector('#start-button');

//The Tetrominoes
const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, 
            oTetromino, iTetromino]

let currentPosition = 4;
let current = theTetrominoes[0][0];

//draw the first rotation in first tetromino
function draw(){
    current.forEach(index => {// add tetromino css class to each tetromino
        squares[currentPosition + index].classList.add('tetromino');
    })
}

draw()