
 /* *********** MODEL ************ */

// Model - pure info
// the id is the name of the cat, without capitalization
var model = {
  currentCat: null,
  cats:    [{
    'image': 'images/poplinre.jpg',
    'id': 'poplinre',
    'score': 0,
    'attribution': 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426',
    'alt': 'cute kitty!'
  },{
    'image': 'images/chewie.jpg',
    'id': 'chewie',
    'score': 0,
    'attribution': 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496',
    'alt': 'peeking-cat'
  },{
    'image': 'images/hi-5.jpg',
    'id': 'hi-5',
    'score': 0,
    'attribution': 'https://www.google.ca/imgres?imgurl=http%3A%2F%2Fwww.cats.org.uk%2Fuploads%2Fimages%2Fpages%2Fphoto_latest14.jpg&imgrefurl=http%3A%2F%2Fwww.cats.org.uk%2Fget-involved%2Fsupport-us%2Fcat-magazine%2Fabout-cat-magazine&docid=3j-Iox0Pm2nR-M&tbnid=RJltW7SoXrjC0M%3A&vet=10ahUKEwiZlrP8pafWAhUJ6SYKHc12DeQQMwiBAiggMCA..i&w=574&h=710&bih=683&biw=1087&q=cat%20images&ved=0ahUKEwiZlrP8pafWAhUJ6SYKHc12DeQQMwiBAiggMCA&iact=mrc&uact=8',
    'alt': 'This cat!'
  },{
    'image': 'images/pipsqueak.jpg',
    'id': 'pipsqueak',
    'score': 0,
    'attribution': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9j2LkI_WHZhvhuK_BTn6uv8G6OjmjnegZCQUojFPOeUZmdU9m1Q',
    'alt': 'What a cutie!'
  },{
    'image': 'images/jetske.jpg',
    'attribution': 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454',
    'id': 'jetske',
    'score': 0,
    'alt': 'another cute kitty!'
  },{
    'image': 'images/cowboy-dave.jpg',
    'attribution': 'https://lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0#w=588&h=640',
    'id': 'cowboyDave',
    'score': 0,
    'alt': 'awww, kitty!'
  }]
};

/* ************** OCTOPUS ***************** */

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

  setCurrentCat: function(catData){
    model.currentCat = catData;
  },

  getCurrentCat: function(){
    return model.currentCat;
  },

  getAllCats: function(){
    return model.cats;
  },

  changeListColour: function(){

    // get ul element
    var ulKids = document.getElementById('cat-list').children;

    // remove all colours from list
    for ( var i = 0; i<ulKids.length; i++){
      ulKids[i].classList.remove('selected');

      // console.log('ulkids[' +i+ '].id: ', ulKids[i].getAttribute('id'));
      // console.log('model.currentCat.id: ',model.currentCat.id);

      // add colour to cat's list element
      if ( ulKids[i].getAttribute('id') === model.currentCat.id ){
        ulKids[i].classList.add('selected');
      }
    }
  },

  incrementScore: function(){
    model.currentCat.score++;

    // render it now!
    viewCard.render();
  },

  submitChanges: function(currentCat, inputNode){
    console.log('\nsubmitting ' + inputNode.getAttribute('name'));
    var key = inputNode.getAttribute('name');
    currentCat[key] = inputNode.value;
    console.log('key is: ', key);
    console.log('currentCat[' + key + '] is: ', currentCat[key]);

    this.setCurrentCat(currentCat);
    console.log('currentCat is now: ', currentCat.id);
    // this.changeListColour(currentCat);
    // console.log('highlighted cat: ', currentCat.id);
    viewList.render();
    viewCard.render();
  }
};


/* ************************** VIEW ********************* */

// View 1 - the cat list view
var viewList = {

  init: function(){
    // get DOM element for easy access later
    this.ulElement = document.getElementById('cat-list');

    this.render();
  },

  render: function(){
    // clear the list first!
    this.ulElement.innerHTML = "";

    // get list of cat ids, loop through and add into list
    var cats = octopus.getAllCats();

    for (var i = 0; i < cats.length; i++){
      // create HTML list elements
      var item = document.createElement('li');
      var h2 = document.createElement('h2');

      // octopus.changeListColour(octopus.getCurrentCat());

      // set id and text
      item.setAttribute('id', cats[i].id);
      item.appendChild(h2).innerHTML = ( octopus.makeUpperCase(cats[i].id) );

      // listen for click. update list selection & current cat
      item.addEventListener('click', (function(cat){
        // keep fns in storage until the click happens,
        // and THEN call them with the (appropriate) arguments

        if ( octopus.getCurrentCat() ){
          octopus.changeListColour();
        }

        return function(){

          // if viewCard isn't open, open it
          if ( octopus.getCurrentCat() === null ){
            document.getElementById('viewing').classList.remove('hide');
          }
          // set current cat
          octopus.setCurrentCat(cat);

          // remove all highlights in list
          octopus.changeListColour();
          // highlights current cat's name
          this.classList.add('selected');

          viewCard.render();
        };
      })(cats[i]), false);

      // add to page
      this.ulElement.appendChild(item);
    }
  }
};

var viewCard = {
  init: function(){
    // set DOM elements for easy access
    this.name = document.getElementById('cat-name');
    this.button = document.getElementById('cat-button');
    this.image = document.getElementById('cat-image');
    this.catClickName = document.getElementById('catClickName');
    this.count = document.getElementById('count');

    // listen for button click
    this.button.addEventListener('click', function(){
      // update current cat's score
      octopus.incrementScore();
    }, false);
  },

  render: function(){
    // get current cat and capitalize the name
    var currentCat = octopus.getCurrentCat();
    var capId = octopus.makeUpperCase(currentCat.id);

    // put info into HTML nodes
    this.name.textContent = capId;
    this.image.src = currentCat.image;
    this.image.alt = currentCat.alt;
    this.catClickName.textContent = capId;
    this.count.textContent = currentCat.score;
  }
};

/* *********************** ADMIN ************************** */

// admin button toggles the admin section
// where user can alter current cat's name, url, click count
var admin = {
    init: function(){
        // get buttons for event listeners
        this.button = document.getElementById('admin');
        this.submitButton = document.getElementById('makeChanges');
        this.cancelButton = document.getElementById('cancel');

        // set text
        this.button.innerHTML = "<h2>Admin</h2>";
        idLabel.innerHTML = "Change name to:";
        imageLabel.innerHTML = "Change url to:";
        scoreLabel.innerHTML = "Change clicks to:";

        // TODO: WHY are these variables correct?
        // console.log('3 labels: ', idLabel, imageLabel, scoreLabel);

        // opens admin section on click
        this.button.addEventListener('click', function(){
            this.nextElementSibling.classList.remove('hide');
        }, false);

        // change data when submitted
        this.submitButton.addEventListener('click', function(){
            console.log('submit button clicked!');
            var children = this.parentElement.getElementsByTagName('label');
            var currentCat = octopus.getCurrentCat();

            if ( !currentCat ){
              alert('Please choose a cat before changing its name.');
            }

            // get input values
            for (var i=0; i<children.length; i++){
                var item = children[i].nextElementSibling;

                // if not blank, then update!
                if ( item.value !== '' ){
                    octopus.submitChanges(currentCat, item);
                }
            }

            admin.cancel();
        }, false);

        // cancel change & close admin area when cancelled
        this.cancelButton.addEventListener('click', function(){
            admin.cancel();
        }, false);
    },

    cancel: function(){
      // clear the form and close the admin area
      this.button.nextElementSibling.reset();
      this.button.nextElementSibling.classList.add('hide');
    }
};


octopus.init();