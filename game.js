var canvas = document.getElementById('canvas_id')
var ctx = canvas.getContext('2d')
var side = 20, rows = 12, colums = 20, moveTime = 200, counter = 0
var coef = 3, frequency = 12
var car = []
var enemyCars = []
var carColor = '#000000'
var carTemplate = [[2,0],[1,1],[2,1],[3,1],[2,2],[1,3],[3,3]]
var isRunnig = true
var boardCounter = 0

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
        PushBack(block[0]+additionCoef,block[1]-coef,enemyCar)
    }
    enemyCars.push(enemyCar)
}

function GetRandIn(min, max){ return Math.floor(Math.random() *
                                                (max - min + 1)) + min }

function PushBack(rowIndex, colIndex, inputCar){
    inputCar.push({rowIndex:rowIndex, colIndex:colIndex})
}

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
    var auxCoef=3
    for(var index = 0; index < colums; index++){
        if(index%auxCoef != boardCounter){
            ctx.fillRect(0, index*side, side, side)
            ctx.fillRect((rows-1)*side-side, index*side, side, side)
        }
    }
    boardCounter++
    if(boardCounter==auxCoef)
        boardCounter=0
}

function DrawEnemyCars(){
    var enemyCar
    var block
    for(var index = 0; index < enemyCars.length; index++){
        enemyCar = enemyCars[index]
        ctx.clearRect(enemyCar.rowIndex,enemyCar.colIndex,side*4,side*3)
        for(var blockIndex = 0; blockIndex < enemyCar.length; blockIndex++){
            block = enemyCar[blockIndex]
            ctx.fillRect(block.rowIndex*side, block.colIndex*side, side, side)
        }
    }
}

function MoveEnemyCars(){
    var enemyCar
    var block
    for(var index = 0; index < enemyCars.length; index++){
        enemyCar = enemyCars[index]
        for(var blockIndex = 0; blockIndex < enemyCar.length; blockIndex++){
            block = enemyCar[blockIndex]
            block.colIndex++
            if(block.colIndex == colums+4){
                enemyCars[index].pop()
                console.log('deleted')
            }
        }
    }
    GenerateEnemy()
}

function GenerateEnemy(){
    if(counter%frequency==0)
        AddEnemy(0)
    counter++
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

function CheckCollision(){
    var enemyCar
    var enemyBlock, block
    for(var index = 0; index < enemyCars.length; index++){
        enemyCar = enemyCars[index]
        for(var carIndex = 0; carIndex < car.length; carIndex++){
            for(var blockIndex = 0; blockIndex < enemyCar.length; blockIndex++){
                enemyBlock = enemyCar[blockIndex]
                block = car[carIndex]
                if(block.rowIndex == enemyBlock.rowIndex &&
                   block.colIndex == enemyBlock.colIndex){
                    isRunnig=false;
                    console.log('stop')
                }
            }
       }
    }
}

SetCar()

document.addEventListener('keydown', function(event) {
    var head = car[car.length-1]
    if(isRunnig){
        if(event.which == 37) Move('left')
        else if (event.which == 39) Move('right')
        else if (event.which == 38) MoveEnemyCars()
        DrawCar()
        CheckCollision()
    }
})

mainGameCycle = setInterval(function(){
    if(isRunnig){
        CheckCollision()
        DrawCar()
        MoveEnemyCars()
    }
},moveTime)
