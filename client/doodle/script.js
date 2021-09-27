/*if script.js is not at bottom of html, 
put all js into eventlistener when html is loaded */
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid'); /*select grid class in html*/
    const doodler = document.createElement('div');/*create div element */
    let isGameOver = false
    let speed = 3
    let platformCount = 5
    let platforms = []
    let score = 0
    let doodlerLeftSpace = 50
    let startPoint = 150
    let doodlerBottomSpace = startPoint
    const gravity = 0.9
    let upTimerId
    let downTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId
    let rightTimerId

    /*create doodler by appending doodler div
    to grid div then style doodler div with .classList */
    function createDoodler(){
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerLeftSpace = platforms[0].left
        doodler.style.left = doodlerLeftSpace + 'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'

    }

    /*each platform will have own bottom, left spacing */
    class Platform {
        constructor(newPlatBottom) {/*public constructor/initializer */
          this.left = Math.random() * 315
          this.bottom = newPlatBottom
          this.visual = document.createElement('div')
    
          /*visual is div element placed into grid div, visual has class
          "platform for styling" */
          const visual = this.visual 
          visual.classList.add('platform')
          visual.style.left = this.left + 'px'/*style platforms left and bottom */
          visual.style.bottom = this.bottom + 'px'
          grid.appendChild(visual)
        }
      }

    /*create as many platforms as platformCount, push to plaforms array */
    function createPlatforms() {
        for(let i =0; i < platformCount; i++) {
          let platGap = 600 / platformCount /*gap between platforms */
          let newPlatBottom = 100 + i * platGap
          let newPlatform = new Platform (newPlatBottom)
          platforms.push(newPlatform) /*insert platform insto array */
          console.log(platforms)
        }
      }

      /*move platforms when doodler reaches certain height, move
      platforms down */
      function movePlatforms() {
        if (doodlerBottomSpace > 200) {
            platforms.forEach(platform => {/*for each platform in array,
                                            decrease bottom padding*/
              platform.bottom -= 4
              let visual = platform.visual/*access visual attribute which
                                            contains class and styling */
              visual.style.bottom = platform.bottom + 'px'
    
              /*when platform bottom has gotten low wnough */
              if(platform.bottom < 10) {
                let firstPlatform = platforms[0].visual
                firstPlatform.classList.remove('platform')/*remove first platform from array */
                platforms.shift()
                console.log(platforms)
                score++
                var newPlatform = new Platform(600)
                platforms.push(newPlatform)/*place new platform at top of screen */
              }
          }) 
        }

      }

      function jump() {
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function () {/*jump for 30 ms */
          console.log(startPoint)
          console.log('1', doodlerBottomSpace)
          doodlerBottomSpace += 20
          doodler.style.bottom = doodlerBottomSpace + 'px'/*increase bottom padding in styles */
          console.log('2',doodlerBottomSpace)
          console.log('s',startPoint)
          if (doodlerBottomSpace > (startPoint + 200)) {
            fall()
            isJumping = false
          }
        },30)
      }

      function fall() {
        isJumping = false
          clearInterval(upTimerId)
          downTimerId = setInterval(function () {
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace <= 0) {
              gameOver()
            }
            platforms.forEach(platform => {
              if (
                (doodlerBottomSpace >= platform.bottom) &&
                (doodlerBottomSpace <= (platform.bottom + 15)) &&
                ((doodlerLeftSpace + 60) >= platform.left) && 
                (doodlerLeftSpace <= (platform.left + 85)) &&
                !isJumping
                ) {
                  console.log('tick')
                  startPoint = doodlerBottomSpace
                  jump()
                  console.log('start', startPoint)
                  isJumping = true
                }
            })
      
          },20)
      }
      
      function moveLeft() {
        if (isGoingRight) {
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId = setInterval(function () {
            if (doodlerLeftSpace >= 0) {
              console.log('going left')
              doodlerLeftSpace -=5
               doodler.style.left = doodlerLeftSpace + 'px'
            } else moveRight()
        },20)
      }
    
      function moveRight() {
        if (isGoingLeft) {
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimerId = setInterval(function () {
          //changed to 313 to fit doodle image
          if (doodlerLeftSpace <= 313) {
            console.log('going right')
            doodlerLeftSpace +=5
            doodler.style.left = doodlerLeftSpace + 'px'
          } else moveLeft()
        },20)
      }
      
      function moveStraight() {
        isGoingLeft = false
        isGoingRight = false
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
      }
    
      //assign functions to keyCodes
      function control(e) {
        doodler.style.bottom = doodlerBottomSpace + 'px'
        if(e.key === 'ArrowLeft') {
          moveLeft()
        } else if (e.key === 'ArrowRight') {
          moveRight()
        } else if (e.key === 'ArrowUp') {
          moveStraight()
        }
      }
    
      function gameOver() {
        isGameOver = true
        while (grid.firstChild) {
          console.log('remove')
          grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
      }

    function start() {
        if (!isGameOver) {
          createPlatforms()
          createDoodler()
          setInterval(movePlatforms,30)/*every 30 ms, movePlatforms */
          jump(startPoint)
          document.addEventListener('keyup', control)
        } 
      }
      start()
    
    
})
