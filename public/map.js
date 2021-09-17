// Create the map
var map = L.map('map',{drawControl: false}).setView([51.9692307002609,7.595822811126709], 14);
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
          polygon: true,
          rectangle: false
        }
      }).addTo(map);

//marker with form
map.on('draw:created', function(e) {
   var coords = e.layer._latlng;
  //  console.log(coords);
    var tempMarker = featureGroup.addLayer(e.layer);
    var popupContent = 
    '<form role="form" id="form" enctype="multipart/form-data" class = "form-horizontal" onsubmit="addMarker()">'+
    
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
//marker end

//Bushaltestelle
var hskoordinatenarray=[]
var anzahlhs
var busmarker
var array4marker=[]

//Bushaltestellen json datei verarbeitung
$.getJSON("Haltestellenjson.json", function(json) {
  anzahlhs=json.features.length
  
for(let a=0; a<anzahlhs;a++){
    hskoordinatenarray[a]=json.features[a].geometry.coordinates
    

    /*
    koordinaten wetter name
    
    */
   array4marker[a]=[]
   //array einträge aus objekt filtern
   var longitude=hskoordinatenarray[a][0]
   var latitude=hskoordinatenarray[a][1]
   var name=json.features[a].properties.lbez
  
   //Attribute ins neue array schreiben
   
   for (let b=0;b<2;b++){
    array4marker[a][0]=longitude;
    array4marker[a][1]=latitude;
    array4marker[a][2]=name;
    
   }
 
   
 } 

 //add marker+info to map + on off switch
 var busmarkerarray=[]
 for(let i=0; i<anzahlhs;i++){
  var busmarker=L.marker([array4marker[i][1],array4marker[i][0]]).addTo(map).bindTooltip(
    /*text*/"name: "+array4marker[i][2],
  {
      permanent: false, 
      direction: 'right'
      
  });
 busmarkerarray[i]=busmarker
 }
//loop end
//on off bushaltestellen button
var busmarkergroup = L.layerGroup(busmarkerarray);
var overlayMaps = {
  "Bushaltestellen anzeigen": busmarkergroup
};
L.control.layers(null,overlayMaps).addTo(map);


//dummy nearest busstopp
var mylocationlat=51.963668
var mylocationlon= 7.62355
var mylocation =L.marker([mylocationlat,mylocationlon]).addTo(map).bindTooltip(
  "Mein Standort",
{
    permanent: true, 
    direction: 'right'
    
});





//calculate distance of tow coordinates
/**
 * 
 * @param {number} lat1 first latitude
 * @param {number} lon1 first longitude
 * @param {number} lat2 second latitut
 * @param {number} lon2 second longitude
 * @returns 
 */
 function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;
  
  return (12742 * Math.asin(Math.sqrt(a)))*1000; // 2 * R; R = 6371 km
}
//function nearest busstopp



function getnearestbusstopp(mylocationlatitude,mylocationlongitude, allbusstopps){
  var distanceofcoordinates
  var distancearray=[]
  for (var n=0;n<anzahlhs;n++){
   //calculate distance for every busstopp
  distanceofcoordinates=distance(mylocationlongitude,mylocationlatitude,allbusstopps[n][0],allbusstopps[n][1])
  distancearray[n]=[]
   for (var da=0;da<4;da++){
   
    distancearray[n][0]=distanceofcoordinates;
    distancearray[n][1]=allbusstopps[n][2];
    distancearray[n][2]=allbusstopps[n][0];
    distancearray[n][3]=allbusstopps[n][1];
   }
      //console.log(distanceofcoordinates)
  }
  //sorted array
   var sortedarray=distancearray.sort(sortFunction);
//nearestbusstopp
  var nearestbusstopp=sortedarray[0]
  return nearestbusstopp
}

var nbusstopp=getnearestbusstopp(mylocationlat,mylocationlon,array4marker)

//nearestbusstoppname
 nbsname=nbusstopp[1]
//nearestbusstopplatitude
nbslongitude=nbusstopp[2]
//nearestbusstopplongitude
nbslatitude=nbusstopp[3]

shownearestbusstopMarker(nbslatitude,nbslongitude,nbsname)

//show nearest bustopp with marker+textpopup
function shownearestbusstopMarker(lat, lng,name) {
  
  $(document).ready(function(){
      
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid=",function(data){
         
   //interesting Json object attributes
   var location = name
   var sky=data.weather[0].description
   var temperatur=(data.main.temp)-273
   var windspeed=data.wind.speed
    //Ouput Marker
  
      L.marker([lat,lng]).addTo(map).bindTooltip("Ort: "+location+'<br>'+"Himmel: "+sky+'<br>'+"Temperatur: "+temperatur+'<br>'+"Windgeschwindigkeit: "+windspeed+" ", 
      {
          permanent: false, 
          direction: 'right'
          
      }
  );
          });
          
      });
      
  }

//sort function
function sortFunction(a, b) {
  if (a[0] === b[0]) {
      return 0;
  }
  else {
      return (a[0] < b[0]) ? -1 : 1;
  }
}
});
