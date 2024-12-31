
var runStart = 0;

function keyCheck(event) {
    if (event.which == 13) {
        if (runWokerId == 0) {
            runWokerId = setInterval(run, 100);
            runSound.play();
            runStart = 1;
            createBlockId = setInterval(createBlock, 100        );
            moveBlockId = setInterval(moveBlock, 100);  
            backgroundWokerId = setInterval(moveBackGround, 50);
            scoreWokerId = setInterval(updateScore, 100);

        }

    }
    if (event.which == 32) {
        if (runStart == 1) {
            if (jumpWokerId == 0) {
                clearInterval(runWokerId);
                runSound.pause();
                jumpWokerId = setInterval(jump, 100);
                jumpSound.play();

            }

        }



    }


}



//Create Block  
var blockMarginLeft = 600;
var blockId = 1;
var createBlockId = 0;

function createBlock() {
    var block = document.createElement("div");
    block.className = "block";

    block.id = "block" + blockId;
    blockId++;

    var gap = Math.random() * (1000 - 400) + 400;
    blockMarginLeft = blockMarginLeft + gap;

    block.style.marginLeft = blockMarginLeft + "px";
    document.getElementById("background").appendChild(block);
}



//Move Block
var moveBlockId = 0;

function moveBlock() {
    for (var i = 1; i <= blockId; i++) {
        var currentBlock = document.getElementById("block" + i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        currentBlock.style.marginLeft = newMarginLeft + "px";
        if (newMarginLeft <= 84) {//84-24
            if (newMarginLeft >= 43) {
                if (boyMarginTop <= 380) { //380-330
                    if (boyMarginTop >= 330) {
                        clearInterval(runWokerId);
                        runSound.pause();
                        clearInterval(jumpWokerId);
                        jumpWokerId = -1;
                        runSound.play();
                        clearInterval(backgroundWokerId);
                        clearInterval(scoreWokerId);
                        clearInterval(moveBlockId);
                        clearInterval(createBlockId);
                        deadWokerId = setInterval(dead, 100);
                        runSound.pause();
                        deadSound.play();

                    }






                }
            }
        }
    }
}



//Background Move

var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWokerId = 0;
function moveBackGround() {
    backgroundX = backgroundX - 20;
    background.style.backgroundPositionX = backgroundX + "px";
}


var runSound=new Audio("run.mp3");
runSound.loop=true;

//Run
var runWokerId = 0;
var boy = document.getElementById("boy");
var runImageNumber = 1;

function run() {
    runImageNumber = runImageNumber + 1;
    if (runImageNumber == 9) {
        runImageNumber = 1;

    }
    boy.src = "Run (" + runImageNumber + ").png";
}

var jumpSound= new Audio("jump.mp3");

//Jump
var jumpImageNumber = 1;
var jumpWokerId = 0;
var boyMarginTop = 380;

function jump() {
    jumpImageNumber = jumpImageNumber + 1;
    if (jumpImageNumber <= 7) {
        boyMarginTop = boyMarginTop - 15;
        boy.style.marginTop = boyMarginTop + "px";

    }
    if (jumpImageNumber >= 8) {
        boyMarginTop = boyMarginTop + 15        ;
        boy.style.marginTop = boyMarginTop + "px";
    }
    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;
        clearInterval(jumpWokerId);
        jumpWokerId = 0;

        runWokerId = setInterval(run, 100);
        runSound.play();


    }

    boy.src = "Jump (" + jumpImageNumber + ").png";

}

//Score Update
var score = document.getElementById("score");
var newScore = 0;
var scoreWokerId = 0;

function updateScore() {
    newScore = newScore + 1;
    score.innerHTML = newScore;
}

var deadSound= new Audio("dead.mp3");

//Dead

var deadImageNumber = 1;
var deadWokerId = 0;

function dead() {
    deadImageNumber = deadImageNumber + 1;
    if (deadImageNumber == 11) {
        deadImageNumber = 10;
        
        boy.style.marginTop = "380px";
        document.getElementById("gameover").style.visibility="visible";
        document.getElementById("endScore").innerHTML=newScore;
        
    }
    
    boy.src = "Dead (" + deadImageNumber + ").png";

}

//Function Restart

function re(){
    location.reload();
}