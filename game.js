var canvas = document.getElementById('canvas_id')
var ctx = canvas.getContext('2d')
var side = 20, rows = 11, colums = 20, moveTime = 500
var coef = 3
var car = []
var carColor = '#000000'

PushBack(2,colums-4)

PushBack(1,colums-3)
PushBack(2,colums-3)
PushBack(3,colums-3)

PushBack(2,colums-2)

PushBack(1,colums-1)
PushBack(2,colums-1)
PushBack(3,colums-1)

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
    var block
    for(var index = 0; index < car.length; index++){
        block = car[index]
        ctx.fillRect(block.rowIndex*side, block.colIndex*side, side, side)
    }
    DrawBoard()
}

function DrawBoard(){
    for(var index = 0; index < colums; index++){
        if(index%2 == 0){
            ctx.fillRect(0, index*side, side, side)
            ctx.fillRect((rows-1)*side+2, index*side, side, side)
        }
    }
}

function MoveLeft(){
    var block
    for(var index = 0; index < car.length; index++){
        block = car[index]
        block.rowIndex-=coef
    }
}

function MoveRight(){
    var block
    for(var index = 0; index < car.length; index++){
        block = car[index]
        block.rowIndex+=coef
    }
}

DrawCar()

document.addEventListener('keydown', function(event) {
    var head = car[car.length-1]
    if(event.which == 37) MoveLeft()
    else if (event.which == 39) MoveRight()
      DrawCar()
})
/*
mainGameCycle = setInterval(function(){
    if(isRunning){
      DrawCar()
      Move()
    }
},moveTime)

DrawCar()
*/
