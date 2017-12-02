//grab triggers
var bodyContent = document.getElementById("bodyContent");
var prompt = document.getElementById("directions");
var userGuess = document.getElementById("guessed");
var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var blankArray = [];
var userChances = document.getElementById("chances");
var hangmanWords = ["hawaii", "surfing", "Humuhumunukunukuapuaa", "luau", "pineapple", "beach", "coconut", "crab"]

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

//COME BACK TO THIS ONE
function updateChances (e) {
    //userChances.innerHTML = 11;

}

//event listeners
document.addEventListener('keydown', showContent)
document.addEventListener('keydown', hidePrompt)
document.addEventListener('keydown', userInput);
document.addEventListener('keydown', updateChances);