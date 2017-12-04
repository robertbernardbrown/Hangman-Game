//grab triggers
var bodyContent = document.getElementById("bodyContent");
var prompt = document.getElementById("directions");
var userGuess = document.getElementById("guessed");
var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var blankArray = [];
var userChances = document.getElementById("chances");
var hangmanWords = ["hawaii", "surfing", "humuhumunukunukuapuaa", "luau", "pineapple", "beach", "coconut", "crab"];
var guessedWord = document.getElementById("guessWord");
var winColumn = document.getElementById("wins");
var winCount = 1;


//grab random number for random word
var randomWord = hangmanWords[Math.round(Math.random() * (hangmanWords.length - 1))];
console.log(randomWord);
var randomWordArray = randomWord.split("");
console.log(randomWordArray);


//declare empty array
var revealArray = [];

function blanks() {
    for (k = 0; k < randomWord.length; k++) {
        revealArray[k] = '_';
    }
    var emptyString = revealArray.toString().replace(/,/g, ''); //use regex to remove commas
    guessedWord.innerHTML = emptyString;
}

function revealWord(e) {
for (var m = 0; m < randomWordArray.length; m++) {
    
    if (randomWordArray[m] === e.key) {
        revealArray[m] = e.key;
        } 
    }
    var arrayString = revealArray.toString().replace(/,/g, ' '); //use regex to remove commas    
    guessedWord.innerHTML = arrayString;
}

function stringIt() {
    for (n = 0; n < revealArray.length; n++) {
        var raString = revealArray.toString();
        var rwaString = randomWordArray.toString();
        if (raString === rwaString) {
            winColumn.innerHTML = winCount++; //count a win
            break;
        }
    }
    console.log(revealArray);
    console.log(randomWordArray);
}

function showContent() {
    bodyContent.classList.add("container", "body");
    bodyContent.classList.remove("hidden");
}

function hidePrompt () {
    prompt.classList.add("hidden");
    prompt.classList.remove("title", "container");
}

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

//COME BACK TO THIS ONE
function updateChances (e) {
    //userChances.innerHTML = 11;

}

//event listeners
document.addEventListener('keydown', showContent);
document.addEventListener('keydown', hidePrompt);
document.addEventListener('keydown', userInput);
document.addEventListener('keydown', updateChances);
document.addEventListener('keydown', revealWord);
document.addEventListener('keydown', stringIt);



//run function
blanks();
