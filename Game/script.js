var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
console.log(canvas.width);

var x = canvas.width/2;
var y = canvas.height-30;

let mau = 0;

var dx = 2;
var dy = -2;
var paddleHeight = 5;//độ cao của thanh hứng
var paddleWidth = 105; // độ rộng của thanh hứng
var paddleX = (canvas.width-paddleWidth)/2;


var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5; // số ô trên 2 dòng
var brickColumnCount = 3; // số hàng của ô

//khoản cách của các ô
var brickWidth = 70;
var brickHeight = 20;
var brickPadding = 10;




var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//điểm và sô lần chơi
var score = 0;
var lives = 3;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(r=0; r<brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
}
console.log(bricks);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
        if(e.keyCode == 39) {
                rightPressed = true;
        }
        else if(e.keyCode == 37) {
                leftPressed = true;
        }
}
function keyUpHandler(e) {
        if(e.keyCode == 39) {
                rightPressed = false;
        }
        else if(e.keyCode == 37) {
                leftPressed = false;
        }
}
function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
                paddleX = relativeX - paddleWidth/2;
        }
}
function collisionDetection() {
        for(c=0; c<brickColumnCount; c++) {
                for(r=0; r<brickRowCount; r++) {
                        var b = bricks[c][r];
                        if(b.status == 1) {
                                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                                        dy = -dy;
                                        b.status = 0;
                                        score++;
                                        if(score == brickRowCount*brickColumnCount) {
                                                alert("YOU WIN, CONGRATS!");
                                                document.location.reload();
                                        }
                                }
                        }
                }
        }
}

function drawBall() {


        if (mau >= 360) {
                mau = 0;
        }
        console.log('mau '+mau);
        ctx.fillStyle = `hsl(${mau}, 50%, 50%)`;
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        mau+=1;
        ctx.fill();
        ctx.closePath();

}
function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "pink";
        ctx.fill();
        ctx.closePath();
}
function drawBricks() {
        for(c=0; c<brickColumnCount; c++) {
                for(r=0; r<brickRowCount; r++) {
                        if(bricks[c][r].status == 1) {
                                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;

                                // dùng để tương tác giửa các khối
                                bricks[c][r].x = brickX;
                                bricks[c][r].y = brickY;

                                //
                                ctx.beginPath();
                                ctx.fillStyle = "red";
                                ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                                ctx.fill();
                                ctx.closePath();
                        }
                }
        }
}
function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();

        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
                dx = -dx;
        }
        if(y + dy < ballRadius) {
                dy = -dy;
        }
        else if(y + dy > canvas.height-ballRadius) {
                if(x > paddleX && x < paddleX + paddleWidth) {
                        dy = -dy;
                }
                else {
                        lives--;
                        if(!lives) {
                                alert("GAME OVER");
                                document.location.reload();
                        }
                        else {
                                x = canvas.width/2;
                                y = canvas.height-30;
                                dx = 3;
                                dy = -3;
                                paddleX = (canvas.width-paddleWidth)/2;
                        }
                }
        }

        if(rightPressed && paddleX < canvas.width-paddleWidth) {
                paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
                paddleX -= 7;
        }

        x += dx;
        y += dy;
        requestAnimationFrame(draw);
}
draw();
setInterval(draw, 1000);
