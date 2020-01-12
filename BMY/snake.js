
let n = 30;

let timeSetBi = 2000;
let mau = 0;
const canvas = document.getElementById("bmb");
let lscore  = document.querySelector('.number_score');
const ctx = canvas.getContext("2d");

let bi = [];
bi[0] = {
    x : canvas.width/2,
    y : 15
};
let paddleHeight = 15;//độ cao của thanh hứng
let paddleWidth = 85; // độ rộng của thanh hứng
let paddleX = (canvas.width-paddleWidth)/2;

var x ;
var y = 15;

let score =0;
let rightPressed = false;
var ballRadius = 10;
let leftPressed = false;
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    if (mau >= 360) {
        mau = 0;
    }
    ctx.fillStyle = `hsl(${mau}, 50%, 50%)`;
    ctx.beginPath();
    bi.forEach(b =>{
        ctx.beginPath();
        if(b.x < paddleX+paddleWidth+10&& b.x > paddleX && b.y>385 &&b.y<420){
            ctx.fillStyle = "#FF0000";
        }else{
            ctx.fillStyle = `hsl(${mau}, 50%, 50%)`;
        }
        ctx.arc(b.x, b.y, ballRadius, 0, Math.PI*2);
        b.y = b.y+5;
        mau+=10;
        ctx.fill();
        ctx.closePath();
    })
}

function setBi(){
    if(bi.length ===7) {
        bi.splice(6);
    }
    xbi= randomBi();
    let objBi ={
        x : xbi,
        y : 15
    }
    bi.unshift(objBi);
}
setInterval(setBi, timeSetBi);
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
    if(relativeX > 0+35 && relativeX < canvas.width-25) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function draw() {
    //  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "pink";
    ctx.fillRect(0,0,1500,500);
    ctx.fillText(0,0,"SSSSS");
    drawPaddle();
    drawBall();
    let check = true;
    bi.forEach(b =>{
        if(b.x < paddleX+paddleWidth+10&& b.x > paddleX && b.y===400){
            score ++;
            lscore.textContent=score;
        } else if(b.y===400) {
            ctx.fillStyle = "blue";
            ctx.font = "20px Georgia";
            ctx.fillText("You Loss", canvas.width/2-30, canvas.height/2);
            clearInterval(aaaa);
        }
    })
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += n;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= n;
    }

}
 let aaaa=  setInterval(draw, 100);
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function randomBi() {
    return Math.round(Math.random() * (canvas.width-5 - 5) + 5);
} 























