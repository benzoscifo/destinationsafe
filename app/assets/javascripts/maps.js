

function initialize() {
  var myCenter=new google.maps.LatLng(51.508742,-0.120850);
  var mapProp = {
      center:myCenter,
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
  var marker=new google.maps.Marker({
    position:myCenter,
  });

  marker.setMap(map);
}

$(function() {
  google.maps.event.addDomListener(window, 'load', initialize)

})
