    document.addEventListener('DOMContentLoaded', () => {
    const scoreBoard = document.querySelector('span')
    const startButton = document.querySelector('.start')
    const field = document.querySelector('.field')

    const width = 20
    let currentIndex = 0 
    let foodIndex = 0 
    let snakeIndex = [2,1,0] 
    let direction = 1
    let score = 0
    let speed = .9
    let intervalTime = 0
    let interval = 0
    
    for (let i = 0; i < 400; i++) {
        const square = document.createElement('div')
        field.appendChild(square)
      }
      const squares = Array.from(document.querySelectorAll('.field div'))
    //to start game or reset
    function startGame() {
      snakeIndex.forEach(index => squares[index].classList.remove('snake'))      
      squares[foodIndex].classList.remove('food')
      clearInterval(interval)
      score = 0
      randomfood()
      direction = 1
      scoreBoard.innerText = score
      intervalTime = 1000
      snakeIndex = [3,2,1,0]
   
      currentIndex = 0
      snakeIndex.forEach(index => squares[index].classList.add('snake'))
      interval = setInterval(moveOutcomes, intervalTime)
    }
  
  

    function moveOutcomes() {
       
      //game over
      if (
        (snakeIndex[0] + width >= (width * width) && direction === width ) || 
        (snakeIndex[0] % width === width -1 && direction === 1) || 
        (snakeIndex[0] % width === 0 && direction === -1) || 
        (snakeIndex[0] - width < 0 && direction === -width) ||  
        squares[snakeIndex[0] + direction].classList.contains('snake') 
      ) {
       document.getElementById("result").style.display="block"
       document.getElementById("result").innerHTML="Game over"
        return clearInterval(interval) 
      }
      document.getElementById("result").style.display="none"
      const tail = snakeIndex.pop() 
      squares[tail].classList.remove('snake')  
      snakeIndex.unshift(snakeIndex[0] + direction) 
  
      //eating food
      if(squares[snakeIndex[0]].classList.contains('food')) {
        squares[snakeIndex[0]].classList.remove('food')
        squares[tail].classList.add('snake')
        snakeIndex.push(tail)
        randomfood()
        score++
        scoreBoard.textContent = score*5
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
      }
      squares[snakeIndex[0]].classList.add('snake')
    }
  
  
    //random foods
    function randomfood() {
      do{
        foodIndex = Math.floor(Math.random() * squares.length)
      } while(squares[foodIndex].classList.contains('snake')) 
      squares[foodIndex].classList.add('food')
    }
  
  
    //movements
    function controls(e) {
      squares[currentIndex].classList.remove('snake')
  
      if(e.keyCode === 39) {
        direction = 1 
      } else if (e.keyCode === 38) {
        direction = -width
      } else if (e.keyCode === 37) {
        direction = -1 
      } else if (e.keyCode === 40) {
        direction = +width 
      }
    }
  
    document.addEventListener('keyup', controls)
    startButton.addEventListener('click', startGame)
  })




