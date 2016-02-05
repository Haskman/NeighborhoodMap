//Place data
var places = [{
        "title": "Cookout",
        "description": "Cheapest fast food place in the area. The best choice when the fact of being broke becomes more urgent than eating well",
        "coordinates": {lat: 34.034523, lng: -84.571618},
        "type": "Food"
    },

    {
        "title": "Cobb Center Mall",
        "description": "The nearest mall. Has standard mall stuff.",
        "coordinates": {lat: 34.018442, lng:  -84.564487},
        "type": "Shopping"
    },

    {
        "title": "Kennesaw Mountain",
        "description": "The local 'mountain'. Place of a battle during the Civil War. Now a good hiking and picnic location for locals and college people going out on Sunday afternoons",
        "coordinates": {lat:  33.978166, lng: -84.578104},
        "type": "Landmark"
    },

    {
        "title": "Lake Allatoona",
        "description": "The local lake. Good for swimming in the summer for people who are stuck in the vicinity for any reason",
        "coordinates": {lat:  34.153361, lng: -84.692461},
        "type": "Landmark"
    },

    {
        "title": "Kennesaw State University",
        "description": "The local university. I go here.",
        "coordinates": {lat: 34.037648, lng: -84.581396},
        "type": "School"
    },
];

//Global variables
map;
mapMarkers = ko.observableArray([]);


//Initialize the map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:  33.989474, lng: -84.537597},
        zoom: 13
    });

    //Initialize markers
    function MarkerInit(place) {
        this.title = place.title;
        this.cords = place.coordinates;
        this.desc = place.description;
        this.type = place.type;
        this.infoWindow = new google.maps.InfoWindow();

        function infoWindowContent(place){
            var contentString = "<h3>"+this.type+"</h3>"+
                "<h4>" + this.title + "</h4>"+
                "<p>"+this.desc+"</p>"+
                "<img src='https://maps.googleapis.com/maps/api/streetview?size=400x400&location="+this.cords.lat+","+this.cords.lng+"'></img>";
            return contentString;
        }
        infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent(place)
        });

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.cords),
            title: this.title,
            type: this.type,
            map: map,
            content: infoWindowContent(place),
            infoWindow: this.infoWindow
        });

        mapMarkers().push(marker);

        marker.addListener('click', function() {
            //Close all infoWindows and stop all animations
            for (i in mapMarkers()){
                if(mapMarkers()[i].infoWindow) {
                    mapMarkers()[i].infoWindow.close();
                    mapMarkers()[i].setAnimation(null);
                }

            }
            //Animate marker
            marker.setAnimation(google.maps.Animation.BOUNCE);

            //Stop animating after 0.75 seconds
            setTimeout(function(){marker.setAnimation(null);},750);

            //Open current infoWindow
            this.infoWindow.open(map, marker);
        });


    }

    for (i in places){
            MarkerInit(places[i]);
    };
}

//ViewModel
var viewModel = function(){
    this.phraseToFilter = ko.observable("");

    this.allCategories = ko.observableArray([]); //All filterable items
    for (i in places){
        if (this.allCategories.indexOf(places[i].type) < 0) {
            this.allCategories.push(places[i].type);
        }

    }

    this.categoriesToFilter = ko.observableArray(["Food"]);// Initial selection since everyone loves food

    this.filterByPhrase = function () {
        var markerVisibility;
        for (i in mapMarkers()){
            markerVisibility = true;
            if (mapMarkers()[i].title.toLowerCase().match(this.phraseToFilter().toLowerCase()) == null){
                markerVisibility = false;
            };
            mapMarkers()[i].setVisible(markerVisibility);
        }
    };

    this.filterByCategories = function () {
        var markerVisibility;
        for (i in mapMarkers()){
            markerVisibility = false;
            for (j in this.categoriesToFilter()){
                if (this.categoriesToFilter()[j] == mapMarkers()[i].type){
                    markerVisibility = true;
                }
                else{
                    continue;
                }
            }
            mapMarkers()[i].setVisible(markerVisibility);
        }
    };
}

ko.applyBindings(new viewModel(), view);