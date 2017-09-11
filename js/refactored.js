// Model - pure info
// the id is the name of the cat, without capitalization
var cats = [
    {
        'image': 'images/poplinre.jpg',
        'id': 'poplinre',
        'score': 0,
        'alt': 'cute kitty!'
    },{
        'image': 'images/unnamed.jpg',
        'id': 'chewie',
        'score': 0,
        'alt': 'peeking-cat'
    },{
        'image': 'images/harvey.jpg',
        'id': 'harvey',
        'score': 0,
        'alt': 'see the cute Harvey!'
    },{
        'image': 'images/arthur.jpg',
        'id': 'arthur',
        'score': 0,
        'alt': 'Arthur is cute.'
    },{
        'image': 'images/hi-5.jpg',
        'id': 'hi-5',
        'score': 0,
        'alt': 'Hi-5 is a master hi-5-er!'
    },{
        'image': 'images/pipsqueak.jpg',
        'id': 'pipsqueak',
        'score': 0,
        'alt': 'What a cutie Pipsqueak is.'
    }
];

// Octopus - communications between model and views
// (user functions?)
var octopus = {
    init: function(){
        viewList.init();
        viewCard.init();
    },

    makeUpperCase: function(item){
        return item.charAt(0).toUpperCase() + item.slice(1)
    },

    getCatIds: function(){
        var catIds = [];
        cats.forEach(function(cat){
            catIds.push(cat.id);
        })
        return catIds;
    },

    getCatInfo: function(catName){
        var catInfo;
        cats.forEach(function(cat){
            if (cat.id === catName){
                catInfo = cat;
            }
        })
        return catInfo;
    },

    addButton: function(){
        var button = document.getElementsByTagName('button')[0];

        // actually add the button
        button.addEventListener('click', function(event){
            var cat = octopus.getCatInfo(button.parentElement.getElementsByTagName('span')[0].getAttribute('id'));
            var id = button.parentElement.getElementsByTagName('span')[0].getAttribute('id');

            button.parentElement.getElementsByTagName('span')[0].innerHTML = 1 + octopus.getCatInfo(id).score++;

            // event.stopPropagation();
            // event.preventDefault();
        }, false);
    }
};

// View 1 - the cat list view
var viewList = {

    init: function(){
        // get list of catnames and their ids, loop through and add into list
        octopus.getCatIds().forEach(function(id){
            var item = document.createElement('li');
            var h2 = document.createElement('h2');

            item.setAttribute('id', id);
            item.appendChild(h2).innerHTML = ( octopus.makeUpperCase(id) );
            // item.firstChild.onclick = toggleItem; // on the h2
            document.getElementsByTagName("ul")[0].appendChild(item);
        })
    }
};

// View 2 - the cat display area
var viewCard = {
    //
    init: function(){
        // Create structural elements
        var createDiv = document.createElement('div');
        var createButton = document.createElement('button');
        var createImg = document.createElement('img');
        var createP = document.createElement('p');
        var createSpan = document.createElement('span');

        // organize HTML structure
        var template = createDiv;
        template.appendChild(createButton).appendChild(createImg);
        template.appendChild(createP).appendChild(createSpan);

        // add attributes
        template.setAttribute('id', 'viewing');

        // hide the viewing div
        template.setAttribute('class', 'hide');

        // append viewing div to the main div
        document.getElementById('main').append(template);

        // add buttons
        viewCard.clickName();
        octopus.addButton();
    },

    // listens for name to be clicked
    clickName: function(){
        // get list item
        var nameList = document.getElementsByTagName('li');
        var div = document.getElementById('viewing');

        for ( var i = 0; i < nameList.length; i++ ){

            // when cat name is clicked, cat's card & info shows up, and allows for image click
            nameList[i].addEventListener('click', (function(){
                // get all cat's info
                var cat = octopus.getCatInfo(this.getAttribute('id'));

                // get viewing div to update cat
                var catLink = this;

                // make the div visible
                div.setAttribute('class', '');

                // add the image
                div.firstChild.firstChild.setAttribute('src', cat.image);
                div.firstChild.firstChild.setAttribute('alt', cat.alt);

                // the p and the span!
                div.lastChild.innerHTML = "You have clicked this cat <span id='" + cat.id + "'>" + cat.score + "</span> times.";
            }));
        }
    }
};

octopus.init();

