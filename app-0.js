var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//this changes the "context". Can be WebGL


var x = canvas.width / 2;
var y = canvas.height - 30; //starting position
var ballRadius = 10;

var dx = 2; //rate of change for ball movement
var dy = -2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2); //last 2 param are start and end of ball
    ctx.fillStyle = "blue"; //CSS colors work
    ctx.fill();
    ctx.closePath();
}

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var paddleDx = 7;
var rightPressed;
var leftPressed;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function keyDownHandler(event) {
    if(event.keyCode == 39) {
        rightPressed = true;
    }
    else if(event.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if(event.keyCode == 39) {
        rightPressed = false;
    }
    else if(event.keyCode == 37) {
        leftPressed = false;
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function draw() {
//Where the work is done
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clears canvas each iteration
    drawBall();
    drawPaddle();
    
    //To detect collision
    //left-right
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    //top
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    
    if(rightPressed && (paddleX + paddleWidth) < canvas.width) {
        paddleX += paddleDx;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= paddleDx;
    }
    

/* 
ball must be greater than paddleX
less than paddleX + paddleWidth
greater than canvas.height - paddleHeight

*/
    if (x + dx > paddleX && 
        x + dx < paddleWidth + paddleX && 
        y + dy > canvas.height - paddleHeight - ballRadius) {
        dy = -dy;
    }
    
    
    x += dx;
    y += dy;
    
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
//runs argument function when browser is ready to update
//runs once. Can use setInterval instead
//setInterval not always optimal because can get blocked up