//grab triggers
var bodyContent = document.getElementById("bodyContent");
var prompt = document.getElementById("directions");

console.log(bodyContent);

function showContent(e) {
    bodyContent.classList.add("container", "body");
    bodyContent.classList.remove("hidden");
}

function hidePrompt (e) {
    prompt.classList.add("hidden");
    prompt.classList.remove("title", "container");
}

//event listeners
document.addEventListener('keydown', showContent)
document.addEventListener('keydown', hidePrompt)