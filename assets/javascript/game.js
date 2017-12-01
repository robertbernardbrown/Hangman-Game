//grab triggers
var bodyContent = document.getElementById("bodyContent");
var prompt = document.getElementById("directions");
var userGuess = document.getElementById("guessed");
var letterArray = [];

function showContent(e) {
    bodyContent.classList.add("container", "body");
    bodyContent.classList.remove("hidden");
}

function hidePrompt (e) {
    prompt.classList.add("hidden");
    prompt.classList.remove("title", "container");
}

function userInput (e) {
    letterArray.push(e.key);
    console.log(letterArray);
    userGuess.innerHTML = letterArray;
}

//event listeners
document.addEventListener('keydown', showContent)
document.addEventListener('keydown', hidePrompt)
document.addEventListener('keydown', userInput);