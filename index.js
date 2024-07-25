var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userPattern = [];
var level = 1;
var started = false;


$(document).keydown(function(event) {
    if (!started) { 
        setSequence();
        started = true;
    }
});


function randomColor() {
    return buttonColors[Math.floor(Math.random() * buttonColors.length)];
}


function setSequence() {
    userPattern = [];
    gamePattern = [];
    $(".title").text("Level: " + (level));
    for (var i = 0; i < level; i++) {
        gamePattern.push(randomColor());
    }
    playSequence();

}

function playSequence() {
    $(".title").text("Level: " + (level));
    gamePattern.forEach(function(color, i) {
        setTimeout(function() {
            playSounds(color);
        }, 1000*i );
    });
}


function playSounds(color){
    $(`#${color}`).addClass("pressed");

    $(`#${color}`).fadeIn(40).fadeOut(40).fadeIn(40);
    var audio = new Audio(`sounds/${color}.mp3`);
    audio.play();

    setTimeout(() => {
        $(`#${color}`).removeClass("pressed");
    }, 200);
    
    setTimeout(function() {
        audio.pause();
    }, 1000);

    
}



$(".block").click(function(event) {
    if(started){
        var userColor = event.target.id;
        userPattern.push(userColor);
        playSounds(userColor);
        checkAnswer();
    }
})


async function checkAnswer() {
    var currentStep = userPattern.length - 1; 

    if (userPattern[currentStep] === gamePattern[currentStep]) {
        console.log("Correct!");
        if (userPattern.length === gamePattern.length) {
            setTimeout(function() {
                level++;
                userPattern = []; 
                setSequence(); 
            }, 800);
        }
    } else {
        console.log("Wrong!");
        await gameOver();
    }
}

async function gameOver(){
    new Audio("sounds/wrong.mp3").play();
    gamePattern = [];
    userPattern = [];
    level = 1;
    started = false;
    $(".title").text("Game Over, Press Any Key to Restart");
}