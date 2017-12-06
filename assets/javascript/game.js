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

// ------DECLARE ARRAYS AND VARIABLES --------

//keep track of letters guessed
var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var blankArray = [];
//answer array
var hangmanWords = ["hawaii", "surfing", "humuhumunukunukuapuaa", "luau", "pineapple", "beach", "coconut", "crab"];
//reveal word array
var revealArray = [];
//counting wins
var winCount = 1;
//chances left
var chancesLeft = 11;
userChances.innerHTML = chancesLeft;
//starting hangman illustration
var increment = 0;
//grab random number for random word
var randomVar = Math.round(Math.random() * (hangmanWords.length - 1));
var randomWord = hangmanWords[randomVar].split("");
console.log(randomWord);
//set audio variable
var audio = new Audio('assets/sounds/seagull.mp3');

// -----FUNCTIONS------

// tap key to show game content area
function showContent() {
    bodyContent.classList.add("container", "body");
    bodyContent.classList.remove("hidden");
}
function hidePrompt () {
    prompt.classList.add("hidden");
    prompt.classList.remove("title", "container");
}

// game functionality


// compare the randomWord to the user guess (e.key) and set the reveal array equal to the randomWord at index m. Display answer in HTML
function revealWord(e) {
    for (m = 0; m < randomWord.length; m++) {
        if (randomWord[m] === e.key) {
            revealArray[m] = e.key;
            }     
        } 
        var arrayString = revealArray.toString().replace(/,/g, ' '); //use regex to remove commas
        guessedWord.innerHTML = arrayString;
    }

// pull the random number variables into a function to run when again later in the program
function randomizer (arr) {
    randomVar = Math.round(Math.random() * (arr.length - 1));
    randomWord = arr[randomVar].split("");
}

// compare to the randomWord variable and display a number of blanks equal to the length of the randomWord. Display in the HTML
function blanks() {
    for (k = 0; k < randomWord.length; k++) {
        revealArray[k] = '_';
    }
    var emptyString = revealArray.toString().replace(/,/g, ''); //use regex to remove commas
    guessedWord.innerHTML = emptyString;
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

// convert revealArray (built from user input) and randomWord(built from randomizer) into strings to compare values
// if equal, run iterate function
function stringIt(e) {
    for (n = 0; n < revealArray.length; n++) {
        var raString = revealArray.toString();
        var rwaString = randomWord.toString();
        if (raString === rwaString) {
            iterate(e);
            break;
        } 
    }
}

function seagulls() {

}

// will run when revealArray (built from user input) and randomWord(built from randomizer) are equal
// does a lot. Will list line-by-line
function iterate(e) {
    winColumn.innerHTML = winCount++; //count a win
    audio.play();
    blankArray = []; //reset blank array
    revealArray = []; //reset reveal array for user input
    letterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; //reset letter array so users can choose from all letters
    hangmanWords.splice(randomVar, 1); // splice the word that was just guessed from the hangmanWord choices
    randomizer(hangmanWords); // run the randomizer to choose a new word from remaining words
    userInput(e); // run userInput function to pick up userInput with new instance of game after a word has been guessed
    blanks(); // rerun the blanks function
    revealWord(e); // rerun the revealWord function
    raString = revealArray; // reset the raString
    rwaString = randomWord; // reset the rwaString
    //listen for the winColumn to get to 7, if so, launch a win message
    if (winColumn.innerHTML == "7") {
        youWin.classList.add("win-active");
        youWin.classList.remove("hidden");
        youWinText.classList.add("win-text-active");
        youWinText.classList.remove("hidden");
    }
    // console.log(randomWord);
    // console.log(hangmanWords);
    // console.log(blankArray);
    // console.log(revealArray);
    // console.log(letterArray);
    // console.log(raString);
    // console.log(rwaString);
}

// function loops through the letterArray with all letters available and splices the chosen letters from the array, only allowing users to guess them once
function userInput (e) {
    for (i = 0; i < letterArray.length; i++) {
        if(e.key === letterArray[i]) {
            blankArray.push(" " + e.key);
            letterArray.splice(i, 1);
            // console.log(letterArray);
            guessed.innerHTML = blankArray;
        }
    }
}

// function to increment the hangman illustration and run when a user guesses a wrong letter
function updateMan () {
    increment++;
    var incrementMax = valBetween(increment, 0, 11);
    document.getElementById("hangman-pic").src="assets/images/hangman" + incrementMax + ".svg";
}

//max/min increment variable and the chancesLeft variable to prevent making superfluous requests when game is over
//credit to http://www.hnldesign.nl/work/code/javascript-limit-integer-min-max/
function valBetween(v, min, max) {
    return (Math.min(max, Math.max(min, v)));
}

// ------EVENT LISTENERS-------
document.addEventListener('keydown', showContent);
document.addEventListener('keydown', hidePrompt);
document.addEventListener('keydown', userInput);
document.addEventListener('keydown', revealWord);
document.addEventListener('keydown', stringIt);
document.addEventListener('keydown', decrementChances);

// --------RUN FUNCTION--------
blanks();
