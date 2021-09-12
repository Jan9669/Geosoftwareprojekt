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


//Bushaltestelle
var hskoordinatenarray=[]
var anzahlhs
var marker
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

   //var hstemperatur=showtemperatur(latitude,longitude)
   //Attribute ins neue array schreiben
   
   for (let b=0;b<2;b++){
    array4marker[a][0]=longitude;
    array4marker[a][1]=latitude;
    array4marker[a][2]=name;
    //array4marker[a][3]=hstemperatur
    //array4marker[a][3]=Wetter
   }
 
   
 } 
 //end loop
//console.log(array4marker)
 //add marker to map
 for(let i=0; i<anzahlhs;i++){
  marker=L.marker([array4marker[i][1],array4marker[i][0]]).addTo(map).bindTooltip(
    /*text*/"name: "+array4marker[i][2]+'<br>'+"Temperatur:"+/*array4marker[i][3]+*/'<br>'+"Wetter:"+"",
  {
      permanent: false, 
      direction: 'right'
      
  });
 }
//loop end
 
});
//getjson function end


//wetter api funktion
  //key bitte hier nicht stehen lassen :)
  var key=''


function showtemperatur(lat, lng) {

    $(document).ready(function(){
        
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid="+key,function(data){
           
     //interesting Json object attributes
     
     //var sky=data.weather[0].description
     var temperatur=(data.main.temp)-273
     
            });
            
        });
        
    }

  
//test

//  console.log(showtemperatur(50,8))











