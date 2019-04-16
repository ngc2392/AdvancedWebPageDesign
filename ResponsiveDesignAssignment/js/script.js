// filter closest to the sun, farthest from the sun 

var data = [

    {
        "id":"",
        "planetName":"Earth",
        "imageURL":"images/planets/earth.jpg"
    },{
        "id": "",
        "planetName": "Jupiter",
        "imageURL": "images/planets/jupiter.jpg"
    }, {
        "id": "",
        "planetName": "Mars",
        "imageURL": "images/planets/mars.jpg", 
        "links":["https://mars.nasa.gov/", "https://mars.nasa.gov/msl/multimedia/images/"]
    }, {
        "id": "",
        "planetName": "Mercury",
        "distanceFromSun": "About 36 million miles",
        "interestingFacts":["Mercury is the smallest planet in our solar system", 
                "It is the closest planet to the Sun", "One day on Mercury = 59 days on Earth"],
        "imageURL": "images/planets/mercury.jpg",
        "links": ["https://solarsystem.nasa.gov/planets/mercury/overview/"]
    }, {
        "id": "",
        "planetName": "Neptune",
        "imageURL": "images/planets/neptune.jpg"
    }, {
        "id": "",
        "planetName": "Saturn",
        "imageURL": "images/planets/saturn.jpg"
    }, {
        "id": "",
        "planetName": "Uranus",
        "imageURL": "images/planets/uranus.jpg"
    }, {
        "id": "",
        "planetName": "Venus",
        "orderFromTheSun":3,
        "moons":"",
        "imageURL":"images/planets/venus.jpg",
        "links":["https://www.nasa.gov/venus", "https://solarsystem.nasa.gov/planets/venus/overview/"]
    }
];

$(document).ready(function() {

    generatePlanetList(data);

});

var generatePlanetList = function(array) {
    array.forEach(function(dataItem) {
        var element = document.createElement("div");

        element.innerHTML = `
            <div id="planet-${dataItem.id}" class="card">
                <div class="image-container">
                    <div class="title">${dataItem.planetName}</div>
                    <img src="${dataItem.imageURL}" />
                    <div class="overlay">
                        <div class="text">Planet ${dataItem.planetName}</div>
                    </div>
                </div>

                <div class="content">
                    This is a pic
                </div>

                <div class="button-wrapper">
                    <div class="btn button1">
                        Purchase Planet
                    </div>
                </div>
               

                <div class="modal-box">
                    <i class="fas fa-times"></i>
                    <div class="modal-header">
                        <h3>${dataItem.planetName}</h3>
                    </div>
                    <div class="content">
                        this is a box 

                        <ol>
                            <li>hi</li>
                            <li>there</li>
                        </ol>
                        
                    </div>
                </div>

                <div id="modal-box-button-click">
                    You really didn't think we sold planets, did you?
                </div>
                

            </div>
        `
        
        var planetsGrid = document.querySelector('.planets-container');
        planetsGrid.appendChild(element);
     
    });
};

// show modal popup when UI card is clicked (when image-container is clicked)
$(document).on('click', '.card .image-container', function(e) {
    // https://api.jquery.com/eq/
    console.log($(this).siblings().eq(2));

    // show .modal-box
    $(this).siblings().eq(2).show();
    document.getElementById("full-screen-overlay").style.display = "block";
  
});

// click anywhere else outside the pop up, close it 

$(document).mouseup(function(e) {
    var modalPopup = $(".modal-box");

    var childrenOfPopup = modalPopup.children();
    var clickedElement = e.target;
    // if we click anythign that is not the pop up or inside the popup, close it
    if(!modalPopup.is(clickedElement) && !childrenOfPopup.is(clickedElement)) {
        modalPopup.hide();
        document.getElementById("full-screen-overlay").style.display = "none";
        document.getElementById("modal-box-button-click").style.display="none";
    }
});


$(document).on('click', '.fa-times', function(e) {
    console.log("hi",$(this).parents().eq(0));

    $(this).parents().eq(0).hide();

    $('.modal-box').hide();
    document.getElementById("full-screen-overlay").style.display = "none";

  
});

$(document).on('click', '.card .btn', function(e) {

    document.getElementById("modal-box-button-click").style.display = "block";
    document.getElementById("full-screen-overlay").style.display = "block";
  
});

// click button to add to cart.  Have model box go to center of screen "you really didn't think we were going to sell you a planet, did you?"
// disable vertical scrolling 