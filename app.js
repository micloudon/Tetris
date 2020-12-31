document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const pauseBtn = document.querySelector('#pause-button')
    const musicButton = document.querySelector("#music-button");
    const music = document.querySelector("#music");
    const gameoverSound = document.querySelector("#gameover-sound");
    const lineSound = document.querySelector("#line-sound");
    const dropSound = document.querySelector("#drop-sound");
    const width = 10;
    let intervalSpeed = 1000;
    let nextRandom = 0
    let timerId
    let score = 0
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
    ]

    // the tetrominoes
    const lTetrominoe = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]

    ]

    const zTetrominoe = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]

    const tTetromunoe = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
        
    ]

    const sqTetrominoe = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
      ]   
    
    const tetrominoes = [lTetrominoe, zTetrominoe, tTetromunoe, sqTetrominoe, iTetromino]

    let currentPosition = 4;
    let currentRotation = 0;

    // randomly select a tetromino
    let random = Math.floor(Math.random()*tetrominoes.length)
    let current = tetrominoes[random][currentRotation]

    //draw the tetriminoes
    function draw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
            squares[currentPosition + index].style.backgroundColor = colors[random]
        })
    }

    // undraw the tetrimineos
    function undraw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }

    // assign keys
    function keyControl(e) {
        if(e.keyCode === 38){
            rotate()
        }
    }

    function keyDown(e) {
        if(e.keyCode === 37){
            moveLeft()
        }
        else if(e.keyCode === 39){
            moveRight()
        }
        else if(e.keyCode === 40){
            moveDown()
        }
    }

    function moveDown(){
        undraw()
        currentPosition += width
        draw()
        freeze()
        gameOver()
    }

    // Freeze function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            // generate a new tetromino
            random = nextRandom
            nextRandom = Math.floor(Math.random()*tetrominoes.length);
            current = tetrominoes[random][currentRotation];
            currentPosition = 4;
            draw()
            displayShape()
            addScore()
            clearInterval(timerId)
            fallSpeed()
            dropSound.volume = 0.3;
            dropSound.play();
        }
    }

    // move the tetrominoes and define boundaries 
    function moveLeft(){
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -= 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition += 1
        }

        draw()
        freeze()
    }

    function moveRight(){
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1)

        if(!isAtRightEdge) currentPosition += 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -= 1
        }

        draw()
        freeze()
    }

  //Stop tetrominoes from rotating at an edge 
  function isAtRight() {
    return current.some(index=> (currentPosition + index + 1) % width === 0)  
  }
  
  function isAtLeft() {
    return current.some(index=> (currentPosition + index) % width === 0)
  }

   function isAtTakenRight() {
        return current.some(index => squares[currentPosition + index - width + 1].classList.contains('taken')),
        current.some(index => squares[currentPosition + index - width + 2].classList.contains('taken')),
        current.some(index => squares[currentPosition + index + 1].classList.contains('taken')),
        current.some(index => squares[currentPosition + index + 2].classList.contains('taken')),
        current.some(index => squares[currentPosition + index + width + 1].classList.contains('taken')),
        current.some(index => squares[currentPosition + index + width + 2].classList.contains('taken')),
        current.some(index => squares[currentPosition + index + width*2 + 1].classList.contains('taken')),
        current.some(index => squares[currentPosition + index + width*2 + 2].classList.contains('taken'))
   }

   function isAtTakenRight2() {
    return current.some(index => squares[currentPosition + index - width + 1].classList.contains('taken')),
    current.some(index => squares[currentPosition + index - width + 1].classList.contains('taken') -1),
    current.some(index => squares[currentPosition + index - width + 1].classList.contains('taken') -2),
    current.some(index => squares[currentPosition + index + 1].classList.contains('taken')),
    current.some(index => squares[currentPosition + index + 1].classList.contains('taken') -1),
    current.some(index => squares[currentPosition + index + 1].classList.contains('taken') -2),
    current.some(index => squares[currentPosition + index + width + 1].classList.contains('taken')),
    current.some(index => squares[currentPosition + index + width + 1].classList.contains('taken') -1),
    current.some(index => squares[currentPosition + index + width + 1].classList.contains('taken') -2),
    current.some(index => squares[currentPosition + index + width*2 + 1].classList.contains('taken')),
    current.some(index => squares[currentPosition + index + width*2 + 1].classList.contains('taken') -1),
    current.some(index => squares[currentPosition + index + width*2 + 1].classList.contains('taken') -2)
}
   

   function isAtTakenLeft() {
     return current.some(index => squares[currentPosition + index - width - 1].classList.contains('taken')),
     current.some(index => squares[currentPosition + index - width - 2].classList.contains('taken')),
     current.some(index => squares[currentPosition + index - 1].classList.contains('taken')),
     current.some(index => squares[currentPosition + index - 2].classList.contains('taken')),
     current.some(index => squares[currentPosition + index + width - 1].classList.contains('taken')),
     current.some(index => squares[currentPosition + index + width - 2].classList.contains('taken')),
     current.some(index => squares[currentPosition + index + width*2 - 1].classList.contains('taken')),
     current.some(index => squares[currentPosition + index + width*2 - 2].classList.contains('taken'))
}

function isAtTakenLeft2() {
    return current.some(index => squares[currentPosition + index - width - 1].classList.contains('taken')),
    current.some(index => squares[currentPosition + index - width - 1].classList.contains('taken') +1),
    current.some(index => squares[currentPosition + index - width - 1].classList.contains('taken') +2),
    current.some(index => squares[currentPosition + index - 1].classList.contains('taken')),
    current.some(index => squares[currentPosition + index - 1].classList.contains('taken') +1),
    current.some(index => squares[currentPosition + index - 1].classList.contains('taken') +2),
    current.some(index => squares[currentPosition + index + width - 1].classList.contains('taken')),
    current.some(index => squares[currentPosition + index + width - 1].classList.contains('taken') +1),
    current.some(index => squares[currentPosition + index + width - 1].classList.contains('taken') +2),
    current.some(index => squares[currentPosition + index + width*2 - 1].classList.contains('taken')),
    current.some(index => squares[currentPosition + index + width*2 - 1].classList.contains('taken') +1),
    current.some(index => squares[currentPosition + index + width*2 - 1].classList.contains('taken') +2)
}

    
    function checkRotatedTaken(){
        if (isAtTakenRight()) {
            currentPosition -= 1
        }
        if (isAtTakenLeft()) {
            currentPosition += 1
        }
    }


  function checkRotatedPosition(P){
    P = P || currentPosition       
    if ((P+1) % width < 4) {          
      if (isAtRight()){            
        currentPosition += 1    
        checkRotatedPosition(P) 
        }
    }
    else if (P % width > 5) {
      if (isAtLeft()){
        currentPosition -= 1
        checkRotatedPosition(P)
      }
    }
  }

  function leftEdge() {
      return current.some(index => (currentPosition + index) % width === 0)
  }

  function leftEdge2() {
    return current.some(index => (currentPosition + index) % width === 0),
    current.some(index => (currentPosition + index) % width === 0) + 1,
    current.some(index => (currentPosition + index) % width === 0) + 2,
    current.some(index => (currentPosition + index) % width === 0) + 3
}

  function rightEdge() {
      return current.some(index => (currentPosition + index) % width === width-1)
  }

  function rightEdge2() {
    return current.some(index => (currentPosition + index) % width === width-1),
    current.some(index => (currentPosition + index) % width === width-1) -1,
    current.some(index => (currentPosition + index) % width === width-1) -2
}
    // rotate the tetromino
    function rotate(){
        if(isAtTakenRight() && leftEdge() ||
            isAtTakenLeft() && rightEdge() ||
            current === tetrominoes[4][0 || 2] && isAtTakenRight2() && leftEdge2() ||
            current === tetrominoes[4][0 || 2] && isAtTakenLeft2() && rightEdge2()
              ) {
            currentRotation = 0
        }
        else {
            undraw()
            currentRotation ++

            if(currentRotation === current.length){
            // bring rotation back to zero
            currentRotation = 0
            }

        current = tetrominoes[random][currentRotation]
        checkRotatedPosition()
        checkRotatedTaken()
        draw()
        }
        
    }

    // show next tetrimino in mini-grid
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0

    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //LTet
        [0, displayWidth, displayWidth+1, displayWidth*2+1], //ZTet
        [displayWidth+1, displayWidth+2, 2, displayWidth+3], //TTet
        [0, 1, displayWidth, displayWidth+1], //SQTet
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //ITet


    ]

    function displayShape(){
        displaySquares.forEach(squares => {
            squares.classList.remove('tetromino')
            squares.style.backgroundColor = ''
        })
        upNextTetrominoes[nextRandom].forEach( index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
    }

    function fallSpeed(){
        if(score >= 500) {
            intervalSpeed = 150
            timerId = setInterval(moveDown, intervalSpeed)
        }
        else {
            timerId = setInterval(moveDown, intervalSpeed - (score * 2))
        }
        
    }
    function startGame() {
        document.addEventListener('keyup', keyControl)
        document.addEventListener('keydown', keyDown)
        draw()
        fallSpeed()
        nextRandom = Math.floor(Math.random()*tetrominoes.length)
        displayShape()
        music.volume = 0.4;
        music.play();
        startBtn.disabled = true
        
    }

    function pauseGame() {
        document.removeEventListener('keyup', keyControl)
        document.removeEventListener('keydown', keyDown)
        clearInterval(timerId)
        timerId = null
    }

    function resumeGame() {
        document.addEventListener('keyup', keyControl)
        document.addEventListener('keydown', keyDown)
        fallSpeed()
    }

    // Buttons
    startBtn.addEventListener('click', () => {
        startGame()
    })

    pauseBtn.addEventListener('click', () => {
        if(timerId) {
            pauseGame()
        }
        else {
            resumeGame()
        }
    })


    music.loop = true;
    musicButton.addEventListener("click", () => {
        if (music.paused) {
        music.volume = 0.4;
        music.play();
    
    
    } else {
        music.pause();
  }

});


    //Add score
    function addScore(){
        for(let i = 0; i < 199; i+=width){
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if(row.every(index => squares[index].classList.contains('taken'))){
                score += 10;
                scoreDisplay.innerHTML = score
                lineSound.volume = 0.4;
                lineSound.play();

                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                    squares[index].style.backgroundColor = ''
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            
            }
        }
    }

    //Game over
    function gameOver(){
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            scoreDisplay.innerHTML = 'end'
            clearInterval(timerId)
            document.removeEventListener('keyup', keyControl)
            document.removeEventListener('keydown', keyDown)
            startBtn.disabled = true
            pauseBtn.disabled = true
            music.pause();
            gameoverSound.volume = 0.4;
            gameoverSound.play();
        }
    }

})

