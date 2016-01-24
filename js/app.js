//Place data
var places = [{
        "title": "Cookout",
        "description": "Cheapest fast food place in the area. The best choice when the fact of being broke becomes more urgent than eating well",
        "coordinates": {lat: 34.034523, lng: -84.571618},
        "type": "restaurant"
    },

    {
        "title": "Cobb Center Mall",
        "description": "The nearest mall. Has standard mall stuff.",
        "coordinates": {lat: 34.017913, lng: -84.563803},
        "type": "shopping"
    },

    {
        "title": "Kennesaw Mountain",
        "description": "The local 'mountain'. Place of a battle during the Civil War. Now a good hiking and picnic location for locals and college people going out on Sunday afternoons",
        "coordinates": {lat:  33.976374, lng: -84.579159},
        "type": "sight"
    },

    {
        "title": "Lake Allatoona",
        "description": "The local lake. Good for swimming in the summer for people who are stuck in the vicinity or any reason",
        "coordinates": {lat:  34.133102, lng: -84.624366},
        "type": "sight"
    },

    {
        "title": "Kennesaw State University",
        "description": "The local university. I go here.",
        "coordinates": {lat: 34.038296, lng: -84.583061},
        "type": "school"
    },
];


//Marker Model
MarkerModel = function(places) {
    console.log("this");
    var self = this;
    self.places = ko.observableArray();

    console.log("or this");
    for (var i = 0; i < json.length; i ++) {
        var item = new MarkerModel(places[i]);
        self.places.push(item);
    }

    console.log(self.places);
}

//Render Map

function initMap() {
    var map;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:  33.989474, lng: -84.537597},
        zoom: 13
    });
}

