//grab triggers
var bodyContent = document.getElementById("bodyContent");
var prompt = document.getElementById("directions");
var userGuess = document.getElementById("guessed");
var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var blankArray = [];

function showContent(e) {
    bodyContent.classList.add("container", "body");
    bodyContent.classList.remove("hidden");
}

function hidePrompt (e) {
    prompt.classList.add("hidden");
    prompt.classList.remove("title", "container");
}

function userInput (e) {
    for (i = 0; i < letterArray.length; i++) {
        if(e.key === letterArray[i]) {
            blankArray.push(" " + e.key);
            letterArray.splice(i, 1);
            console.log(letterArray);
            guessed.innerHTML = blankArray;
        }
    }
}

//event listeners
document.addEventListener('keydown', showContent)
document.addEventListener('keydown', hidePrompt)
document.addEventListener('keydown', userInput);