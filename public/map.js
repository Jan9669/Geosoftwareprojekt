
      
      // Create the map

var map = L.map('map',{drawControl: true}).setView([51.9692307002609,7.595822811126709], 6);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Initialise the FeatureGroup to store editable layers
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
  draw : {
      position : 'topleft',
      polygon : false,
      polyline : false,
      rectangle : false,
      circle : false,
      marker : false

  },
  edit : {
      featureGroup: drawnItems

  }


});

map.addControl(drawControl); 
