let board;
let boardWidth = 750;
let boardHeight = 350;
let context;

let doraWidth = 88;
let doraHeight = 94;
let doraX = 50;
let doraY = boardHeight - doraHeight;
let doraImg;

let dora = {
    x : doraX,
    y : doraY,
    width : doraWidth,
    height : doraHeight
}
let ratArray = [];
let rat1Width = 34;
let rat2Width = 69;
let rat3Width = 102;
let ratHeight = 70;
let ratX = 700;
let ratY = boardHeight - ratHeight;

let rat1Img;
let rat2Img;
let rat3Img;

let velocityX = -6; 
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); 
    doraImg = new Image();
    doraImg.src = "C:/Users/DELL/WT/th.jpeg";
    doraImg.onload = function() {
        context.drawImage(doraImg, dora.x, dora.y, dora.width, dora.height);
    }
    rat1Img = new Image();
    rat1Img.src = "C:/Users/DELL/WT/rat1.jpeg";

    rat2Img = new Image();
    rat2Img.src = "C:/Users/DELL/WT/rat1.jpeg";

    rat3Img = new Image();
    rat3Img.src = "C:/Users/DELL/WT/rat1.jpeg";

    requestAnimationFrame(update);
    setInterval(placeRat, 1000);
    document.addEventListener("keydown", moveDora);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);
    velocityY += gravity;
    dora.y = Math.min(dora.y + velocityY, doraY); 
    context.drawImage(doraImg, dora.x, dora.y, dora.width, dora.height);

    for (let i = 0; i < ratArray.length; i++) {
        let rat = ratArray[i];
        rat.x += velocityX;
        context.drawImage(rat.img, rat.x, rat.y, rat.width, rat.height);

        if (detectCollision(dora, rat)) {
            gameOver = true;
            doraImg.src = "C:/Users/DELL/WT/dead.png";
            doraImg.onload = function() {
                context.drawImage(doraImg, dora.x, dora.y, dora.width, dora.height);
            }
        }
    }
    context.fillStyle="black";
    context.font="20px courier";
    score++;
    context.fillText(score, 5, 20);
}

function moveDora(e) {
    if (gameOver) {
        return;
    }
    if ((e.code == "Space" || e.code == "ArrowUp") && dora.y == doraY) {
        velocityY = -10;
    }
    else if (e.code == "ArrowDown" && dora.y == doraY) {
    }
}

function placeRat() {
    if (gameOver) {
        return;
    }
    let rat= {
        img : null,
        x : ratX,
        y : ratY,
        width : null,
        height: ratHeight
    }

    let placeRatChance = Math.random(); 

    if (placeRatChance > .90) { 
        rat.img = rat3Img;
        rat.width = rat3Width;
        ratArray.push(rat);
    }
    else if (placeRatChance > .70) { 
        rat.img = rat2Img;
        rat.width = rat2Width;
        ratArray.push(rat);
    }
    else if (placeRatChance > .50) { 
        rat.img = rat1Img;
        rat.width = rat1Width;
        ratArray.push(rat);
    }

    if (ratArray.length > 5) {
        ratArray.shift(); 
    }
}
function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}