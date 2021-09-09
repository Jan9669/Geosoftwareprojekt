// Create the map
var map = L.map('map',{drawControl: false}).setView([51.9692307002609,7.595822811126709], 6);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Initialise the FeatureGroup to store editable layers

 
//EDIT- 
      //create temp layer to store new features
      var featureGroup = L.featureGroup().addTo(map);

      //create drawing controls and toolbar
      var drawControl = new L.Control.Draw({
        draw: {
          circle: false,
          marker: true,
          polyline: false, 
          polygon: false,
          rectangle: false
        }
      }).addTo(map);
//add marker with coordinates
/*map.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;

    map.addLayer(layer);

    if (type === 'marker') {    
        layer.bindPopup(':' + layer.getLatLng()).openPopup();
    }

});*/
//Custom functions upon 'edit'
map.on('draw:created', function(e) {
    var coords = e.layer._latlng;
    console.log(coords);
    var tempMarker = featureGroup.addLayer(e.layer);
    var popupContent = 
    '<form role="form" id="form" enctype="multipart/form-data" class = "form-horizontal" onsubmit="addMarker()">'+'<strong>Koordinaten</strong>'+'<br>'+coords+
    
//textfield1
'<div class="form-group">'+
'<label class="control-label col-sm-5"><strong>sightname </strong></label>'+
'<textarea class="form-control" rows="1" id="sightname_id" name="sightname"></textarea>'+
'</div>'+
    //'<input style="display: none;" type="text" id="lat" name="lat" value="'+coords.lat.toFixed(6)+'" />'+
    //'<input style="display: none;" type="text" id="lng" name="lng" value="'+coords.lng.toFixed(6)+'" />'+
//textfield2
'<div class="form-group">'+
'<label class="control-label col-sm-5"><strong>sighturl </strong></label>'+
'<textarea class="form-control" rows="1" id="sighturl_id" name="sighturl"></textarea>'+
'</div>'+
//textfield3
'<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong>sightdescription </strong></label>'+
        '<textarea class="form-control" rows="1" id="sightdescription_id" name="sightdescription"></textarea>'+
    '</div>'+
//
    '<div class="form-group">'+
      '<div style="text-align:center;" class="col-xs-4 col-xs-offset-2"><button type="button" class="btn">Cancel</button></div>'+'<br>'+'<br>'+
      '<div style="text-align:center;" class="col-xs-4"><button type="submit" value="submit" class="btn btn-primary trigger-submit">Submit</button></div>'+
    '</div>'+
    '</form>';
    tempMarker.bindPopup(popupContent,{
      keepInView: true,
      closeButton: false
      }).openPopup();

  $("#form").submit(function(e){
      e.preventDefault();
      console.log("didnt submit");

  });
});