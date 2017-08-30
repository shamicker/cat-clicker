// get button element
var button = document.getElementById("click");
var counter = document.getElementById("counter");

var score = 0;
counter.innerHTML = score;

// on click, score goes up
button.addEventListener("click", function(){
    counter.innerHTML = score++;
}, false);

