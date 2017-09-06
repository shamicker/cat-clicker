var catInfo = [{
        'name': 'Poplinre',
        'image': 'images/poplinre.jpg',
        'id': 'poplinre',
        'score': 0,
        'alt': 'cute kitty!'
    },{
        'name': 'Chewie',
        'image': 'images/unnamed.jpg',
        'id': 'chewie',
        'score': 0,
        'alt': 'peeking-cat'
    },{
        'name': 'Harvey',
        'image': 'images/harvey.jpg',
        'id': 'harvey',
        'score': 0,
        'alt': 'see the cute Harvey!'
    },{
        'name': 'Arthur',
        'image': 'images/arthur.jpg',
        'id': 'arthur',
        'score': 0,
        'alt': 'Arthur is cute.'
    },{
        'name': 'Hi-5',
        'image': 'images/hi-5.jpg',
        'id': 'hi-5',
        'score': 0,
        'alt': 'Hi-5 is a master hi-5-er!'
    },{
        'name': 'Pipsqueak',
        'image': 'images/pipsqueak.jpg',
        'id': 'pipsqueak',
        'score': 0,
        'alt': 'What a cutie Pipsqueak is.'
    }];

// for each cat, add li with h2
function makeCatList(cat, index){
    var item = document.createElement('li');
    var h2 = document.createElement('h2');

    item.setAttribute('id', 'item-' + cat.id);
    item.appendChild(h2).innerHTML = cat.name;
    item.firstChild.onclick = toggleItem; // on the h2
    document.getElementsByTagName("ul")[0].appendChild(item);
};

// returns an empty HTML structural template
function makeTemplate(){
    // JS create structural elements
    var createDiv = document.createElement('div');
    var createButton = document.createElement('button');
    var createImg = document.createElement('img');
    var createP = document.createElement('p');

    // organize HTML structure
    var template = createDiv;
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
    template.className = 'hide';
    document.getElementById('item-' + cat.id).append(template);

    // get specific div to update cat
    var div = document.getElementById(cat.id);
    // div.setAttribute('style', 'display:none');

    // the button
    div.firstChild.setAttribute('id', 'btn-' + cat.id);
    // the image
    div.firstChild.firstChild.setAttribute('src', cat.image);
    div.firstChild.firstChild.setAttribute('alt', cat.alt);

    // the p
    div.lastChild.innerHTML = "You have clicked this cat <span id='" + cat.id + "-count'>" + cat.score + "</span> times.";
}

function addButton(cat){
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

// add content to page on load
function init(){
    catInfo.forEach(function(cat, index){
        makeCatList(cat, index);
        addCat(cat, index);
        addButton(cat);
    });
}

// toggle opening cat card
function toggleItem(){
    var itemClass = this.nextElementSibling.className;
    var catNames = document.getElementsByTagName('h2');

    // hide all items
    for (var i = 0; i < catNames.length; i++){
        catNames[i].nextElementSibling.className = 'hide';
    }
    if (itemClass === 'hide') {
        this.nextElementSibling.className = '';
    }
}
