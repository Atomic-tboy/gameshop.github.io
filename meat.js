//putting all the necessary DOM elements  into an object
const domElements = {
    searchBar: document.getElementById('searchBar'),
    // searchButton: document.getElementById('search'),
    productArea: document.getElementById('productArea'),
    reviews: document.querySelector('#reviews'),
    home: document.querySelector('#home'),
    features: document.querySelector('#features'),
    about: document.querySelector('#about'),
    reviewInput: document.querySelector('#reviewInput'),
    submit: document.querySelector('#submit'),
    writeAreviewDiv: document.querySelector('#writeAReview'),
    toggleNavbar: document.getElementById('navbarColor01'),
    toggleNavBtn: document.getElementById('collapse')
};

//calling getGamesArray Function from the fetcher class (question: should it be static ?[Answer i made it static and it worked])
// const main = new Fetcher;

domElements.searchBar.addEventListener('keyup', theRealNigga);
domElements.home.addEventListener('click', goHome);
domElements.features.addEventListener('click', features);
domElements.about.addEventListener('click', aboutUs);
domElements.submit.addEventListener('click', writeAreview);
domElements.toggleNavBtn.addEventListener('click', navStuff);
domElements.productArea.addEventListener('click', buyStuff)

function theRealNigga () {
    Fetcher.getGamesArray()
    .then(data => {
        search(data, domElements.searchBar.value);
        change(data);
    })
    .catch(() => {
        console.log('There Was an error')
    })
}

function writeAreview () {
    let div = create('div', 'alert alert-dismissible alert-secondary');
    div.innerHTML = `<img src='images/Screenshot (3).png'><br><p>${domElements.reviewInput.value}</p>`;
    
    // domElements.reviews.append(div);
    domElements.writeAreviewDiv.insertAdjacentElement('beforebegin', div);

    domElements.reviewInput.value = ''
}

function search (arr, input) {
    let newInput = new RegExp(input.toLowerCase());

    //creating an unordered list

    let ul = create('ul', 'container', 'listOfMatches');
    console.log(ul);

     //clearingProductArea
     clearElement(domElements.productArea);

     //clear Reviews
     clearElement(domElements.reviews);


    arr.forEach(game => {
        if(newInput.test(game.name.toLowerCase())) {
            // alert("We found " + game.name);

           

            //Creating li
            const li = create('li', null, 'listItem');
            // li.innerHTML = `<img src=${game.imageLink}><button id="change" >${game.name}</button>`;
            li.innerHTML = `<img src=${game.imageLink}><button id="change" class='btn alert alert-dismissible alert-secondary'>${game.name}</button>`

            //adding li to the ul
            ul.append(li);

            //Changing the prdouct area
            domElements.productArea.append(ul);

        } else {
            console.log("We didn't find it");
        }
    });
};

//function to create and return a DOM element
function create (element, classname, id) {
    let ele = document.createElement(element);
    ele.className = classname;
    ele.id = id;

    return ele;
};

//function to clear any html element's innerHTML
function clearElement(domEle) {
    domEle.innerHTML = '';
};

//function to carry the event listener
function change (arr) {
    document.querySelectorAll('li button').forEach((game) => {
        //Event listener for every button(game)
        game.addEventListener('click', () => {
            // turning the textContent of the button to a regular expression
            let name = new RegExp(game.textContent);

            // going through the json array
            arr.forEach(element => {
                if(name.test(element.name)) {
                    //Template for the html
                    domElements.productArea.innerHTML = `
                        <div id="productArea" class="container">
                            <div id="game" class="row">
                                <div id="image" class='col s6 m12'>
                                    <img src="${element.imageLink}" id="coverImg">
                                </div>
                                <div id="name" class="col s6 m12">
                                    <h3>${game.name}</h3>
                                    <H4>Price: ${element.price} Naria</H4>
                                    <a href="#" id='buy' class="btn btn-success">Buy Now</a>
                                </div>
                            </div>
                        
                        <div class="container" id="moreInfo">
                            <div class='row'>
                                <h3 class="col l12">More info:</h3>
                                <h4>${element.descirption}</h4>
                                <br>
                                <h3 id='specArea'>Specs:</h3>
                                    <div id='minimum' class="col s6 m6 l6">
                                        <h4>Minimum:</h4>
                                        <p>RAM: ${element.specsMin.ram}</p>
                                        <p>OS: ${element.specsMin.os}</p>
                                        <p>Storage: ${element.specsMin.storage}GB</p>
                                        <p>Graphics: ${element.specsMin.graphics}</p>
                                        <p>Bits: ${element.specsMin.bits}</p>
                                    </div>

                                    <div id='max' class="col s6 m6 l6">
                                        <h4>Maximum:</h4>
                                        <p>RAM: ${element.specsRec.ram}</p>
                                        <p>OS: ${element.specsRec.os}</p>
                                        <p>Storage: ${element.specsRec.storage}GB</p>
                                        <p>Graphics: ${element.specsRec.graphics}</p>
                                        <p>Bits: ${element.specsRec.bits}</p>
                                    </div>
                            </div>
                        </div>
                    </div>
                        `;
                }
            });
        });
    })
};

function goHome () {
    domElements.productArea.innerHTML = `
    <h3>Welcome to THE SHOP your number like 50 destination for games. We Have a very Narrow sellection of games.</h3>
    <br>
    <h3>But What is better about our site is that we offer cheap games</h3>
    <br>
    <h3>To check our ever growing list of games. Simply use the search bar above.</h3>
  
      <div id="reviews" class="Container">
        <h3>Reviews:</h3>
            <div class="alert alert-dismissible alert-secondary"><img src='images/Screenshot (4).png'><br><p>Wow such a great site love it.</p></div>
            <div class="alert alert-dismissible alert-secondary">
              <img src='images/Screenshot (3).png'><br><p>This site is one of the best sites i have ever used. The blablablablablablabla was so good. It a cinematic Experience.</p>
            </div>
            <div class="alert alert-dismissible alert-secondary">
              <img src='images/Screenshot (3).png'><br><p> Great site. Man this stuff is just fire you feel me how many sites can you use "", Stuff like this is whhy i can't play any old game ma dude you feel me dudes and dudette.</p>
            </div>
      </div>
    `;

    domElements.home.classList.toggle('active');
    domElements.about.classList.remove('active');
    domElements.features.classList.remove('active');

    Event.preventDefault();
};

function features () {
    domElements.productArea.innerHTML = `
    <h3>The main feature, we will discuss about is the low low low prices. I mean at these price we'll soon be out of business for REAL.</h3>
    <br>
    <h3>But i dear you to find a place that offers the prices we do.</h3>
    <br>
    <h3>Now the most important feature the payment, Simply click buy and an account number will be displayed. Pay the money to the account number.</h3>
    `;

    domElements.features.classList.toggle('active');
    domElements.home.classList.remove('active');
    domElements.about.classList.remove('active');
    

    Event.preventDefault();
};

function aboutUs () {
    domElements.productArea.innerHTML = `
        <h3>I don't understand why you clicked this. You already know everything so just why are you here.</h3>
    `;

    domElements.home.classList.remove('active');
    domElements.about.classList.toggle('active');
    domElements.features.classList.remove('active');

    

    Event.preventDefault();
};


function navStuff (event) {
    domElements.toggleNavbar.classList.toggle('show');

    event.preventDefault();
};

function buyStuff (event) {
    if (event.target.id === 'buy') {
        alert('The Count Number is 8110625968, Tobi Clarence Davies. Send the money their Along with your name, address and transport Money. Or Contact 08110625968 for delivery options.');
    }
 };




