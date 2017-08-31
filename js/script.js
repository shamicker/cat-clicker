// get button element
var button = document.getElementById("click-cat");
var counter = document.getElementById("counter");

var catInfo = [
    {
        'name': 'Poplinre',
        'image': 'images/poplinre.jpg',
        'id': 'poplinre',
        'score': 0,
        'alt': 'cute kitty!'
    },
    {
        'name': 'Chewie',
        'image': 'images/unnamed.jpg',
        'id': 'chewie',
        'score': 0,
        'alt': 'peeking-cat'
    }
];

// returns an empty HTML structural template
function makeTemplate(){
    // JS create structural elements
    var createDiv = document.createElement('div');
    var createH2 = document.createElement('h2');
    var createButton = document.createElement('button');
    var createImg = document.createElement('img');
    var createP = document.createElement('p');

    // organize HTML structure
    var template = createDiv;
    template.appendChild(createH2);
    template.appendChild(createButton).appendChild(createImg);
    template.appendChild(createP);

    // template is made
    return template;
}

// add attributes to template per cat
function addCat(cat, index){
    // set id per template and add to HTML
    var template = makeTemplate().cloneNode(true);
    template.setAttribute('id', cat.id);
    document.body.prepend(template);

    // get specific div to update cat
    var div = document.getElementById(cat.id);
    var childrenList = div.children;

    // the h2
    childrenList[0].innerHTML = cat.name;

    // the button
    childrenList[1].setAttribute('id', 'btn-' + cat.id);
    childrenList[1].firstChild.setAttribute('src', cat.image);
    childrenList[1].firstChild.setAttribute('alt', cat.alt);

    // the p
    childrenList[2].innerHTML = "You have clicked this cat <span id='" + cat.id + "-count'>" + cat.score + "</span> times.</p>";
}

function addButton(cat, index){
    // get cat's button
    var button = document.getElementById('btn-' + cat.id);
    var scoreCount = document.getElementById(cat.id + '-count');

    // on click, score goes up
    button.addEventListener("click", function(){
        // cat.score++;
        scoreCount.innerHTML = 1 + cat.score++;
        console.log(cat.name, cat.score);
    }, false);
};


catInfo.forEach(function(cat, index){
    addCat(cat, index);
    addButton(cat, index);
});
