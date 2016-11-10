var canvas = document.getElementById('canvas_id')
var ctx = canvas.getContext('2d')
var side = 20, rows = 10, colums = 20, moveTime = 500
var car = []
var carColor = '#000000'

PushBack(1,colums-4)

PushBack(0,colums-3)
PushBack(1,colums-3)
PushBack(2,colums-3)

PushBack(1,colums-2)

PushBack(0,colums-1)
PushBack(1,colums-1)
PushBack(2,colums-1)

/*
  *
 ***
  *
 ***
*/

function PushBack(rowIndex, colIndex){ car.push({rowIndex:rowIndex, colIndex:colIndex}) }

function DrawCar(){
    ctx.fillStyle = carColor
    ctx.clearRect(0,0,side*rows,side*colums)
    for(var index = 0; index < car.length; index++){
        var block = car[index]
        ctx.fillRect(block.rowIndex*side, block.colIndex*side, side, side)
    }
}

function MoveLeft(){

}

function MoveRight(){

}

document.addEventListener('keydown', function(event) {
    var head = snake[snake.length-1]
    if(event.which == 37) //moveDirection = 'left'
    else if (event.which == 39) //moveDirection = 'right'
})

mainGameCycle = setInterval(function(){
    if(isRunning){
      DrawSnake()
      Move()
    }
},moveTime)

DrawCar()
