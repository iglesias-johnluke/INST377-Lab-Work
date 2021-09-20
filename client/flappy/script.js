
document.addEventListener("DOMContentLoaded", () =>{
    const bird = document.querySelector(".bird")
    const gameDisplay = document.querySelector(".game-container")
    const ground = document.querySelector(".ground")

    // declare spacing variables
    let birdLeft = 220
    let birdBottom = 100 
    let gravity = 2
    let isGameOver = false
    let gap = 430

    function startGame(){
        birdBottom -= gravity //everytime we startgame, birdBottom will decrease by gravity
        bird.style.birdBottom = birdBottom + "px" //set margins of elements
        bird.style.left = birdLeft + "px"

    }
    startGame()
    let gameTimerId = setInterval(startGame, 20)

    function control(e){ //e parameter is event listener
        if(e.keyCode === 32){ //if user clicks space bar (key code 32), jump
            jump()
        }
    }
    
    function jump(){//everytime we jump, birdBottom margin increases
        if(birdBottom < 500){//make sure we have space to jump
            birdBottom += 50
            bird.style.birdBottom = birdBottom + "px"
            console.log(birdBottom) //print birdBottom to log everytime we jump
        }
       
    }

    document.addEventListener("keyup", control) //everytime finger leaves key on keyboard, control() is called

    function generateObstacle(){
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60 //generate random heights for obstacles
        let obstacleBottom = randomHeight
        const obstacle = document.createElement("div")
        const topObstacle = document.createElement("div")

        if (!isGameOver){
            obstacle.classList.add("obstacle") //add class obstacle to div element
            obstacle.classList.add("topObstacle") //add class obstacle to div element

        } 
        gameDisplay.appendChild(obstacle) //insert obstacle div into gameContainer class
        gameDisplay.appendChild(topObstacle)
        
        obstacle.style.left = obstacleLeft + "px" //add padding to obstacle
        obstacle.style.bottom = obstacleBottom + "px"
        topObstacle.style.left = obstacleLeft + "px"
        topObstacle.style.bottom = obstacleBottom + gap + "px"


        function moveObstacle(){//moves obstacles as time passes
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + "px" 
            topObstacle.style.left = obstacleLeft + "px"
            if(obstacleLeft === -60){//when obstacle is out of view, stop timer, remove obstacle
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            if( obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
                birdBottom === 0 ){
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20) //moveObstacle every 20 ms
        if (!isGameOver) setTimeout(generateObstacle, 3000) // after 3000 ms, generateObstacle is executed
    }

    generateObstacle()

    function gameOver(){
        clearInterval(gameTimerId)
        isGameOver = true
        document.removeEventListener("keyup", control) //disable control function, now spacebar doesnt jump
        console.log("gameover")
    }
})