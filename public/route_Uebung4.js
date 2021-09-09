//Custom functions upon 'edit'
map.on('draw:created', function(e) {
    var coords = e.layer._latlng;
    console.log(coords);
    var tempMarker = featureGroup.addLayer(e.layer);
    var popupContent = '<form role="form" id="form" enctype="multipart/form-data" class = "form-horizontal" onsubmit="addMarker()">'+
    '<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong>Date: </strong></label>'+
        '<input type="date" placeholder="Required" id="date" name="date" class="form-control"/>'+ 
    '</div>'+
    '<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong>Gender: </strong></label>'+
        '<select class="form-control" id="gender" name="gender">'+
          '<option value="Male">Male</option>'+
          '<option value="Female">Female</option>'+
          '<option value="Other">Other</option>'+
        '</select>'+ 
    '</div>'+
    '<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong>Age: </strong></label>'+
        '<input type="number" min="0" class="form-control" id="age" name="age">'+ 
    '</div>'+
    //...
    '<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong>Description: </strong></label>'+
        '<textarea class="form-control" rows="6" id="descrip" name="descript">...</textarea>'+
    '</div>'+
    '<input style="display: none;" type="text" id="lat" name="lat" value="'+coords.lat.toFixed(6)+'" />'+
    '<input style="display: none;" type="text" id="lng" name="lng" value="'+coords.lng.toFixed(6)+'" />'+
    '<div class="form-group">'+
      '<div style="text-align:center;" class="col-xs-4 col-xs-offset-2"><button type="button" class="btn">Cancel</button></div>'+
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
      var date =$("#date").val();
      console.log(date);

  });
});