var canvas = document.getElementById('canvas_id')
var ctx = canvas.getContext('2d')
var side = 20, rows = 12, colums = 20, moveTime = 500
var coef = 3
var car = []
var enemyCars = []
var carColor = '#000000'
var carTemplate = [[2,0],[1,1],[2,1],[3,1],[2,2],[1,3],[2,3],[3,3]]

function SetCar(){
    var block
    for(var index = 0; index < carTemplate.length; index++){
        block = carTemplate[index]
        PushBack(block[0],block[1]+colums-4,car)
    }
}

function AddEnemy(){
    var block
    var enemyCar = []
    var additionCoef = coef*GetRandIn(0,2)
    for(var index = 0; index < carTemplate.length; index++){
        block = carTemplate[index]
        PushBack(block[0]+additionCoef,block[1],enemyCar)
    }
    enemyCars.push(enemyCar)
}

function GetRandIn(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min }

function PushBack(rowIndex, colIndex, inputCar){ inputCar.push({rowIndex:rowIndex, colIndex:colIndex}) }

function DrawCar(){
    ctx.fillStyle = carColor
    ctx.clearRect(0,0,side*rows,side*colums)
    var block
    for(var index = 0; index < car.length; index++){
        block = car[index]
        ctx.fillRect(block.rowIndex*side, block.colIndex*side, side, side)
    }
    DrawBoard()
    DrawEnemyCars()
}

function DrawBoard(){
    for(var index = 0; index < colums; index++){
        if(index%2 == 0){
            ctx.fillRect(0, index*side, side, side)
            ctx.fillRect((rows-1)*side-side, index*side, side, side)
        }
    }
}

function DrawEnemyCars(){
    var enemyCar
    var block
    for(var index = 0; index < enemyCars.length; index++){
        enemyCar = enemyCars[index]
        for(var blockIndex = 0; blockIndex < enemyCar.length; blockIndex++){
            block = enemyCar[blockIndex]
            ctx.fillRect(block.rowIndex*side, block.colIndex*side, side, side)
        }
    }
}

function Move(moveDirection){
    var block
    for(var index = 0; index < car.length; index++){
        block = car[index]
        if(moveDirection == 'left' && block.rowIndex - coef > 0)
            block.rowIndex-=coef
        else if(moveDirection == 'right' && block.rowIndex + coef < rows - 2)
            block.rowIndex+=coef
    }
}

SetCar()
AddEnemy()
DrawCar()

document.addEventListener('keydown', function(event) {
    var head = car[car.length-1]
    if(event.which == 37) Move('left')
    else if (event.which == 39) Move('right')
      DrawCar()
})
