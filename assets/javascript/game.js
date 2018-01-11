//------GRAB HTML ELEMENTS ----------
var bodyContent = document.getElementById("bodyContent");
var prompt = document.getElementById("directions");

var guessedWord = document.getElementById("guessWord");
var userGuess = document.getElementById("guessed");
var userChances = document.getElementById("chances");
var winColumn = document.getElementById("wins");
var youWin = document.getElementById("win");
var youWinText = document.getElementById("win-text");
var youLose = document.getElementById("lose");
var youLoseText = document.getElementById("lose-text");
var restartButtonL = document.getElementById("restart-lose");
var restartButtonW = document.getElementById("restart-win");

// ------DECLARE ARRAYS AND VARIABLES --------

var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var blankArray = [];
var hangmanWords = ["hawaii", "surfing", "humuhumunukunukuapuaa", "luau", "pineapple", "beach", "coconut", "crab"];
var revealArray = [];
var winCount = 1;
var chancesLeft = 10;
userChances.innerHTML = chancesLeft;
var increment = 0;

var randomVar = Math.round(Math.random() * (hangmanWords.length - 1));
var randomWord = hangmanWords[randomVar].split("");

var audio = new Audio('assets/sounds/seagull.mp3');

var displayShown = true;



// -----FUNCTIONS------

// tap key to show game content area
function showContent() {
    if(displayShown) {
    bodyContent.classList.add("container", "body");
    bodyContent.classList.remove("hidden");
    prompt.classList.add("hidden");
    prompt.classList.remove("title", "container");
    displayShown = false;
    }
}


// game functionality

// function loops through the letterArray with all letters available and splices the chosen letters from the array, only allowing users to guess them once
function userInput(e) {
    for (var i = 0; i < letterArray.length; i++) {
        if (e.key === letterArray[i]) {
            blankArray.push(" " + e.key);
            letterArray.splice(i, 1);
            guessed.innerHTML = blankArray;
        }
    }
}

// compare the randomWord to the user guess (e.key) and set the reveal array equal to the randomWord at index m. Display answer in HTML
function revealWord(e) {
    for (var m = 0; m < randomWord.length; m++) {
        if (randomWord[m] === e.key) {
            revealArray[m] = e.key;
        }
    }
    var arrayString = revealArray.toString().replace(/,/g, ' '); //use regex to remove commas
    guessedWord.innerHTML = arrayString;
}

// when a user taps a key and guesses a letter, decrement their chances by 1 and display new number of chances
// also run the updateMan function to update the illustration
// also listen for chances to hit 0. Fire the losing message and cease program function
function decrementChances(e) {
    var index = randomWord.indexOf(e.key);
    var chancesLeftMin = valBetween(chancesLeft, 0, 11);
    if (index === -1) {
        chancesLeft--;
        userChances.innerHTML = chancesLeftMin;
        updateMan();
    }
    if (chancesLeftMin === 0) {
        youLose.classList.add("lose-active");
        youLose.classList.remove("hidden");
        youLoseText.classList.add("lose-text-active");
        youLoseText.classList.remove("hidden");
        letterArray = [];
        revealArray = [];
        blankArray = [];
        randomWord = null;
    }
}

// pull the random number variables into a function to run when again later in the program
function randomizer(arr) {
    randomVar = Math.round(Math.random() * (arr.length - 1));
    randomWord = arr[randomVar].split("");
}

// compare to the randomWord variable and display a number of blanks equal to the length of the randomWord. Display in the HTML
function blanks() {
    for (var k = 0; k < randomWord.length; k++) {
        revealArray[k] = '_';
    }
    var emptyString = revealArray.toString().replace(/,/g, ''); //use regex to remove commas
    guessedWord.innerHTML = emptyString;
}

// convert revealArray (built from user input) and randomWord(built from randomizer) into strings to compare values
// if equal, run iterate function
function stringIt(e) {
    for (var n = 0; n < revealArray.length; n++) {
        var raString = revealArray.toString();
        var rwaString = randomWord.toString();
        if (raString === rwaString) {
            iterate(e);
            break;
        }
    }
}

// will run when revealArray (built from user input) and randomWord(built from randomizer) are equal
// does a lot. Will list line-by-line
function iterate(e) {
    winColumn.innerHTML = winCount++;
    audio.play();
    blankArray = [];
    revealArray = [];
    letterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    hangmanWords.splice(randomVar, 1);
    randomizer(hangmanWords);
    blanks();
    revealWord(e);
    userInput(e);
    if (winColumn.innerHTML == "7") {
        youWin.classList.add("win-active");
        youWin.classList.remove("hidden");
        youWinText.classList.add("win-text-active");
        youWinText.classList.remove("hidden");
    }
}

// function to increment the hangman illustration and run when a user guesses a wrong letter
function updateMan() {
    increment++;
    var incrementMax = valBetween(increment, 0, 11);
    document.getElementById("hangman-pic").src = "assets/images/hangman" + incrementMax + ".svg";
}

function restartGame (e) {
    youLose.classList.remove("lose-active");
    youLose.classList.add("hidden");
    youLoseText.classList.remove("lose-text-active");
    youLoseText.classList.add("hidden");

    youWin.classList.remove("win-active");
    youWin.classList.add("hidden");
    youWinText.classList.remove("win-text-active");
    youWinText.classList.add("hidden");

    letterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    blankArray = [];
    hangmanWords = ["hawaii", "surfing", "humuhumunukunukuapuaa", "luau", "pineapple", "beach", "coconut", "crab"];
    revealArray = [];
    winCount = 0;
    chancesLeft = 10;
    userChances.innerHTML = chancesLeft;
    increment = -1;

    randomVar = Math.round(Math.random() * (hangmanWords.length - 1));
    randomWord = hangmanWords[randomVar].split("");

    audio = new Audio('assets/sounds/seagull.mp3');

    userInput(e);
    revealWord(e);
    decrementChances(e);
    blanks();
    stringIt(e);
    iterate(e);
    updateMan();
}

//max/min increment variable and the chancesLeft variable to prevent making superfluous requests when game is over
//credit to http://www.hnldesign.nl/work/code/javascript-limit-integer-min-max/
function valBetween(v, min, max) {
    return (Math.min(max, Math.max(min, v)));
}

// ------EVENT LISTENERS-------
document.addEventListener('keydown', showContent);
document.addEventListener('keydown', userInput);
document.addEventListener('keydown', revealWord);
document.addEventListener('keydown', stringIt);
document.addEventListener('keydown', decrementChances);
restartButtonL.addEventListener('click', restartGame);
restartButtonW.addEventListener('click', restartGame);

// --------RUN FUNCTION--------
blanks();