var cvs = document.querySelector("#snake");
var ctx = cvs.getContext("2d");
var box = 20;
var snake = [];
snake[0]={
    x:10 * box,
    y:10 * box
}
var start = false;
var surja;
var suma;

var pontos = 0;
var ratpoints = 0;

var food = {
    x: Math.floor(Math.random()*29+1)*box,
    y: Math.floor(Math.random()*29+1)*box
}

var img = new Image();

var food1 = {
    x: Math.floor(Math.random()*29+1)*box,
    y: Math.floor(Math.random()*29+1)*box
}

var d;

document.addEventListener("keydown",direcao);

function direcao(event){
    var key = event.keyCode
    console.log(key);
    if(key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}

function collision(head, array){
    for(var i=0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function collision(food1, array){
    for(var i=0; i < array.length; i++){
        if(food1.x == array[i].x && food1.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cvs.width,20);
    ctx.font="18px arial";
    ctx.fillStyle = "white";
    ctx.fillText(ratpoints+pontos,cvs.width/2,20);


    ctx.fillStyle = "white";
    ctx.fillRect(0,20,cvs.width,cvs.height);

    for (var i= 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0)? "green" : "blue";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    img.src = "cherry.png";
    ctx.fillStyle = "black";
    ctx.drawImage(img,food.x,food.y,box,box);
    
    if(start == true){
        var img1 = new Image();
        img1.src = "mouse.png";
        ctx.fillStyle = "white";
        ctx.drawImage(img1,food1.x,food1.y,box,box);
    }else{
        var img1 = new Image();
        img1.src = "mouse.png";
        ctx.fillStyle = "white";
        ctx.drawImage(img1,food1.x,food1.y,box,box);
        food1 = {
            x: 600,
            y: 600
        }
    }

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (d == "LEFT")    snakeX -= box;
    if (d == "UP")      snakeY -= box;
    if (d == "RIGHT")   snakeX += box;
    if (d == "DOWN")    snakeY += box;

    if(snakeX == food.x && snakeY == food.y){
        food = {
            x: Math.floor(Math.random()*29+1)*box,
            y: Math.floor(Math.random()*29+1)*box
        }
        pontos++
    }else if((snakeX == food1.x && snakeY == food1.y) || (snakeX == food1.x+20 && snakeY == food1.y)){
        clearInterval(surja);
        clearInterval(suma);
        ratRise();
        ratBye();
        start = false;
        ratpoints+=5;
    }else{ 
        snake.pop();
    }

    var newhead = {
        x: snakeX,
        y: snakeY
    }

    if(snakeX < 0 || snakeX > cvs.width-box || snakeY < 20 || snakeY > cvs.height-box || 
    collision(newhead,snake)){
    clearInterval(game);
    }

    snake.unshift(newhead);
}
ratRise();
ratBye();

var color = setInterval(myColor,20000)
function myColor(){
    ctx.fillStyle = "blue";
    ctx.fillRect(0,20,cvs.width,cvs.height);
    clearInterval(myColor);

    var stop = setInterval(stopColor,2000)
    function stopColor(){
        ctx.fillStyle = "blue";
        ctx.fillRect(0,20,cvs.width,cvs.height);
        clearInterval(stop);
    }
}

function ratRise(){
    surja = setInterval(function(){
        start = true;
        food1 = {
            x: Math.floor(Math.random()*29+1)*box,
            y: Math.floor(Math.random()*29+1)*box
        }
    },4000);
}

function ratBye(){
    suma = setInterval(function(){
        start = false;
        clearInterval(surja);
        ratRise();
    },8000);
}

var game = setInterval(draw, 100);
    