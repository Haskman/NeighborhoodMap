//Place viewModel
var places = [{
        "title": "Cookout",
        "description": "Cheapest fast food place in the area. The best choice when the fact of being broke becomes more urgent than eating well",
        "coordinates": {lat: 34.034523, lng: -84.571618},
        "type": "Food"
    },

    {
        "title": "Cobb Center Mall",
        "description": "The nearest mall. Has standard mall stuff.",
        "coordinates": {lat: 34.017913, lng: -84.563803},
        "type": "Shopping"
    },

    {
        "title": "Kennesaw Mountain",
        "description": "The local 'mountain'. Place of a battle during the Civil War. Now a good hiking and picnic location for locals and college people going out on Sunday afternoons",
        "coordinates": {lat:  33.976374, lng: -84.579159},
        "type": "Landmark"
    },

    {
        "title": "Lake Allatoona",
        "description": "The local lake. Good for swimming in the summer for people who are stuck in the vicinity or any reason",
        "coordinates": {lat:  34.133102, lng: -84.624366},
        "type": "Landmark"
    },

    {
        "title": "Kennesaw State University",
        "description": "The local university. I go here.",
        "coordinates": {lat: 34.038296, lng: -84.583061},
        "type": "School"
    },
];

//Global variables
var map;
var mapMarkers = [];

//Initialize markers
function MarkerInit(place) {
    this.title = place.title;
    this.cords = place.coordinates;
    this.desc = place.description;
    this.type = place.type;

    function infoWindowContent(place){
        var contentString = "<h3>"+this.type+"</h3>"+
            "<h4>" + this.title + "</h4>"+
            "<p>"+this.desc+"</p>";
        return contentString;
    }
    var infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent(place)
    });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.cords),
        title: this.title,
        label: this.type,
        map: map
    });

    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });

    mapMarkers.push(marker);

}

//Render Map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:  33.989474, lng: -84.537597},
        zoom: 13
    });

    //Initialize markers

    for (i in places){
            MarkerInit(places[i]);
    };

    console.log(mapMarkers);
}

//Search ViewModel
var SearchViewModel = function () {
    this.phraseToSearch = ko.observable("");

    this.allCategories = ko.observableArray([]); //All searchable items
    for (i in places){
        if (this.allCategories.indexOf(places[i].type) < 0) {
            this.allCategories.push(places[i].type);
        }

    }

    this.categoriesToSearch = ko.observableArray(["Food"]);// Initial selection since everyone loves food


    this.searchByPhrase = function () {
        var markerVisibility;
        for (i in mapMarkers){
            markerVisibility = true;
            if (mapMarkers[i].title.toLowerCase().match(this.phraseToSearch().toLowerCase()) == null){
                markerVisibility = false;
            };
            mapMarkers[i].setVisible(markerVisibility);
        }
    };

    this.searchByCategories = function () {
        var markerVisibility;
        for (i in mapMarkers){
            markerVisibility = false;
            for (j in this.categoriesToSearch()){
                if (this.categoriesToSearch()[j] == mapMarkers[i].label){
                    markerVisibility = true;
                }
                else{
                   continue;
                }
            }
            mapMarkers[i].setVisible(markerVisibility);
        }
    };
};

ko.applyBindings(new SearchViewModel());