// Model - pure info
// the id is the name of the cat, without capitalization
var model = {
    currentCat: null,
    cats:    [{
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
    }]
};

// Octopus - communications between model and views
// (user functions?)
var octopus = {
    init: function(){
        viewList.init();
        viewCard.init();
        admin.init();
    },

    makeUpperCase: function(item){
        return item.charAt(0).toUpperCase() + item.slice(1)
    },

    setCurrentCat: function(cat){
        model.currentCat = cat;
    },

    getCurrentCat: function(){
        return model.currentCat;
    },

    getCatIds: function(){
        var catIds = [];
        model.cats.forEach(function(cat){
            catIds.push(cat.id);
        })
        return catIds;
    },

    getCatInfo: function(catName){
        var catInfo;
        model.cats.forEach(function(cat){
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
        }, false);
    },

    submitChanges: function(currentCat, inputNode){
        console.log('\nsubmitting ' + inputNode.getAttribute('name'));
        var currentCatInfo = octopus.getCatInfo(currentCat);
        var key = inputNode.getAttribute('name');
        currentCatInfo[key] = inputNode.value;
        console.log('key is: ', key);
        console.log('currentCatInfo[' + key + '] is: ', currentCatInfo[key]);
        // admin.render();
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

                // remove all colours from list
                var kids = this.parentElement.children;
                for (var i=0; i<kids.length; i++){
                    kids[i].classList.remove('selected');
                }
                // add colour to selected name
                this.classList.add('selected');
                octopus.setCurrentCat(this.getAttribute('id'));

                // make the div visible
                div.classList.remove('hide');

                // add the image
                div.firstChild.firstChild.setAttribute('src', cat.image);
                div.firstChild.firstChild.setAttribute('alt', cat.alt);

                // the p and the span!
                div.lastChild.innerHTML = "You have clicked this cat <span id='" + cat.id + "'>" + cat.score + "</span> times.";
            }));
        }
    }
};

var admin = {
    init: function(){
        // get buttons for event listeners
        var button = document.getElementById('admin');
        var submitButton = document.getElementById('makeChanges');
        var cancelButton = document.getElementById('cancel');

        // // get input nodes for updating changes
        // var name = document.getElementById('nameLabel').nextElementSibling;
        // var url = document.getElementById('urlLabel').nextElementSibling;
        // var click = document.getElementById('clickLabel').nextElementSibling;

        // set text
        button.innerHTML = "<h2>Admin</h2>";
        idLabel.innerHTML = "Change cat's name to:";
        imageLabel.innerHTML = "Change cat's url to:";
        scoreLabel.innerHTML = "Change cat's clicks to:";

        // opens admin section on click
        button.addEventListener('click', function(){
            button.nextElementSibling.setAttribute('class', '');
        }, false);

        // change data when submitted
        submitButton.addEventListener('click', function(){
            console.log('submit button clicked!');
            var children = this.parentElement.getElementsByTagName('label');
            var currentCat = octopus.getCurrentCat();

            // get input values
            for (var i=0; i<children.length; i++){
                var item = children[i].nextElementSibling;

                // if not blank, then update!
                if ( item.value !== '' ){
                    octopus.submitChanges(currentCat, item);
                }
            }
        }, false);

        // cancel change & close admin area when cancelled
        cancelButton.addEventListener('click', function(){
            console.log('cancelled.');
        }, false);
    }
};

octopus.init();

