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
        "imageURL": "images/planets/mercury.jpg"
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
    generateProductList(data);

});

var generateProductList = function(array) {
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

                <div class="modal-box">
                </div>
            
            </div>
        `
        
        var planetsGrid = document.querySelector('.planets-container');
        planetsGrid.appendChild(element);
     
    });
};