let gamePattern = []; // Array to hold the sequence of colors
let userClickedPattern = []; // Array to hold user clicks
let buttonColours = ["red", "blue", "green", "yellow"]; // Available colors
let level = 0; // Current level of the game
let started = false; // Flag to track if the game has started

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    userClickedPattern = []; // Reset user clicks
    level++;
    $("#level-title").text("Level " + level); // Update title with new level
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber]; // Choose a random color
    gamePattern.push(randomChosenColour); // Add to game pattern
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // Animate button
    playSound(randomChosenColour); // Play sound for chosen color
}

// Function to handle user button clicks
$(".btn").click(function() {
    let userChosenColour = $(this).attr("id"); // Get the ID of the clicked button
    userClickedPattern.push(userChosenColour); // Add to user pattern

    playSound(userChosenColour); // Play sound for user choice
    animatePress(userChosenColour); // Animate the button press

    checkAnswer(userClickedPattern.length - 1); // Check the user's answer
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success"); // Correct answer
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence(); // Move to next sequence after a short delay
            }, 1000);
        }
    } else {
        console.log("Wrong"); // Incorrect answer
        playSound("wrong"); // Play wrong sound
        $("body").addClass("game-over"); // Add game-over class to body
        setTimeout(function() {
            $("body").removeClass("game-over"); // Remove class after a short delay
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart"); // Update title
        startOver(); // Reset the game
    }
}

// Function to play sound based on color
function playSound(name) {
    let audio;
    if (name === "wrong") {
        audio = new Audio("./sounds/wrong.mp3"); // Path to wrong sound
    } else {
        audio = new Audio("./sounds/" + name + ".mp3"); // Path to correct sounds
    }
    audio.play(); // Play the audio
}

// Function to animate button press
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed"); // Add pressed class
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed"); // Remove pressed class after delay
    }, 100);
}

// Function to reset the game
function startOver() {
    level = 0; // Reset level
    gamePattern = []; // Reset game pattern
    started = false; // Reset started flag
}

