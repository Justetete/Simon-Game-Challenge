
var isStarted = false;
var failed = false;
var level = 0;
var gamePattern = new Array();
var buttonColours = new Array("red", "blue", "green", "yellow");
var userClickedPattern = [];

// waiting users to start the game
$(document).on("keypress", function() {
    if (!isStarted) {
        nextSequence();
        isStarted = true;
    } else if (failed) {
        startOver();
    }
}); 

$(".btn").click(function() {
    if(!isStarted) {
        return
    } else {
        var userChosenColour = $(this).attr("id")
        playSound(userChosenColour);
        userClickedPattern.push(userChosenColour);
        animatePress(this);
        checkAnswer(userClickedPattern.length - 1); // 每次點擊都要check 答案，那就不應該使用for loop！
    }
});

function nextSequence() {
    userClickedPattern = []; // 新的一輪，需要清空玩家的顏色數組
    level ++; // at the same time, update to the next level
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}


// play sounds function
function playSound(name) {
    switch (name) {
        case "red":
            var audio = new Audio("sounds/red.mp3");
            audio.play();
            break;
        case "blue":
            var audio = new Audio("sounds/blue.mp3");
            audio.play();
            break;
        case "green":
            var audio = new Audio("sounds/green.mp3");
            audio.play();
            break;
        case "yellow":
            var audio = new Audio("sounds/yellow.mp3");
            audio.play();
            break;
        case "wrong":
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            break;
    }
}

function animatePress(currentColour) {
    $(currentColour).addClass("pressed");
    setTimeout(function(){
        $(currentColour).removeClass("pressed");
    }, 100);
}

// check user's answer with gamePattern
// 用戶每次再點擊方塊的時候都會check 一次答案
function checkAnswer(currentIndex) {
    if (gamePattern[currentIndex] == userClickedPattern[currentIndex]) {
        //當前點擊的方塊對應
        if (userClickedPattern.length == gamePattern.length) {
            // 長度也一樣吧，表示已經完成了當前輪次
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver()
    }
}


// when user got wrong answer then call gameOver functionand the finish the game, and wait user to reset the game
function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    failed = true;
}

function startOver() {
    // reset the values of level, gamePattern and isStarted variables
    level = 0;
    gamePattern = [];
    $("body").removeClass("game-over");
    $("h1").text("Press A Key to Start");
    isStarted = false;
    failed = false;
}

