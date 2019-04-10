const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box=16;

const background = new Image();
background.src="images/bg.png";

const foodimg = new Image();
foodimg.src="images/food.png";

const dead=new Audio();
const eat =new Audio();
const up =new Audio();
const down =new Audio();
const left =new Audio();
const right =new Audio();

dead.src="audio/dead.mp3"
eat.src="audio/eat.mp3"
up.src="audio/up.mp3"
down.src="audio/down.mp3"
right.src="audio/right.mp3"
left.src="audio/left.mp3"

// let speed=1000;
// let button=slow;
// slow=1000;
// medium=100;
// fast=25;
var gm="game over";
let snake = [];
snake[0]={
    x : 9*box,
    y:  10*box
};

snake[1]={
    x : 8*box,
    y:  10*box
};

let food = {
    x : Math.floor(Math.random()*34+1) * box,
    y : Math.floor(Math.random()*34+1) * box
}

let score=document.querySelector("#scores");
//control the snake 

document.addEventListener("keydown",direction)
let d;
d="RIGHT";
function direction (event)
{
    if(event.keyCode == 37 && d!="RIGHT")
    {
        left.play();
        d="LEFT";
    }
    else if(event.keyCode == 38 && d!="DOWN")
    {
        up.play();
        d="UP";
    }
    else if(event.keyCode == 39 && d!="LEFT")
    {
        right.play();
        d="RIGHT";
    }
    else if(event.keyCode == 40 && d!="UP")
    {
        down.play();
        d="DOWN";
    }
}
//check collision function
function collision(head,array)
{
    for(let i=0;i<array.length;i++)
    {
        if(head.x==array[i].x && head.y==array[i].y)
        {
            return true;
        }
    }
    return false;
}
let game;
function draw()
{
    ctx.drawImage(background,0,0,608,608);
    for(let i=0;i<snake.length ;i++)
    {
        ctx.fillStyle= (i==0)?"green":"red";
        // ctx.arc(snake[i].x,snake[i].y, 5, 0, 2 * Math.PI);
        // ctx.fill();
        // // snake[i].x = snake[i].x;
        // // snake[i].y = snake[i].y;
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
    }
    ctx.drawImage(foodimg,food.x,food.y,15,15);

    let snakeX= snake[0].x;
    let snakeY= snake[0].y;

    //snake eats
    if(snakeX == food.x && snakeY == food.y)
    {
        eat.play();
        score++;
        scores.textContent=score;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }
    else
    {
        snake.pop();
    }
    

    if(d=="LEFT")  snakeX -=box;
    if(d=="UP")  snakeY -=box;
    if(d=="RIGHT")  snakeX +=box;
    if(d=="DOWN")  snakeY +=box;


    let newhead={
        x : snakeX,
        y : snakeY
    }
    // game over
    if(snakeX < 0 || snakeX > 37*box || snakeY < 0 || snakeY > 37*box || collision(newhead,snake) ) 
    {
        if(collision(newhead,snake))
        {
            ctx.fillStyle="white";
            ctx.fillRect(newhead.x,newhead.y,box,box);
        }
        dead.play();
        clearInterval(game);

        ctx.fillStyle = "red";
        ctx.font = "100px Times New Roman";
        ctx.fillText("Game Over",5*box,20*box);
    }
        snake.unshift(newhead);

        
}

let speed=75;


var slow = document.querySelector(".slowbtn");
var medium = document.querySelector(".mediumbtn");
var fast = document.querySelector(".fastbtn");

medium.classList.add("active");
var btn = document.querySelector(".btn-reload");
slow.addEventListener("click", function(e){
    speed=100;
    slow.classList.add("active");
    medium.classList.remove("active");
    fast.classList.remove("active");
});
medium.addEventListener("click", function(e){
    speed=75;
    slow.classList.remove("active");
    medium.classList.add("active");
    fast.classList.remove("active");
});
fast.addEventListener("click", function(e){
    speed=40;
    slow.classList.remove("active");
    medium.classList.remove("active");
    fast.classList.add("active");
});
btn.addEventListener("click", function(e){
    clearInterval(game);
    game=setInterval(draw,speed);
    score=0;
    scores.textContent=score;
    snake.length=0;
    snake[0]=
    {
        x : 9*box,
        y:  10*box
    };
    
    snake[1]={
        x : 8*box,
        y:  10*box
    };
});
