

function initialize() {
  var myCenter=new google.maps.LatLng(51.508742,-0.120850);
  var mapProp = {
      center:myCenter,
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

  var infowindow= new google.maps.InfoWindow({
    content: contentString
  });

  var marker=new google.maps.Marker({
    position:myCenter,
  });

  var circle=new google.maps.Circle({
    map: map,
    radius: 1000,
    fillColor: '#AA0000'
  });

  circle.bindTo('center', marker, 'position');



  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

  marker.setMap(map);
}

$(function() {
  google.maps.event.addDomListener(window, 'load', initialize)

})
