<script type="text/javascript">

function initialize() {


  var markers = [];
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(-33.8902, 151.1759),
  new google.maps.LatLng(-33.8474, 151.2631));
map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = (document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(input);

  // var infowindow = new google.maps.InfoWindow({
  //   content: contentString
  // });

  // var marker = new google.maps.InfoWindow({
  //   position: defaultBounds,
  //   map: map,
  // });

  // google.maps.event.addListener(marker, 'click', function(){
  //   infowindow.open(map, marker);
  // });

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();
    var address = places[0].name;
    $.ajax({
      url: "/findposts",
      dataType: "JSON",
      method: "post",
      data: {address: address}
    }).success(function(data){

      //If there is not data return from the function;
      if (data.length == 0) {
        return;
      }
      //Clearing previous markers from the page;
      for (var i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(null);
      }

      //For each place, get the icon, place name, and location.
      markers = [];

      var infobody = data[0].body
      var infotitle = data[0].title
      var infouser = 1
      var information = infotitle.concat(" " + infobody + " " + infouser)

      var bounds = new google.maps.LatLngBounds();
      for (var i = 0, place; place = data[i]; i++) {

        var infowindow = new google.maps.InfoWindow({
              content: information
            });
        // get request 
        // Create a marker for each place.
        var marker = new google.maps.Marker({
          map: map,
          infowindow: infowindow,
          title: place.title,
          position: new google.maps.LatLng(place.latitude, place.longitude)
        });

        markers.push(marker);

        bounds.extend(new google.maps.LatLng(place.latitude, place.longitude));
    }

      google.maps.event.addListener(marker, 'click', function() {
        // ajax call to database get info that corresponds to the marker loc and then inject that contect into info window see line 95 for example
        infowindow.open(map,marker);
      });

      map.fitBounds(bounds);

    });
});

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}

window.onload = function(){
  initialize();

}
</script>

// $(function() {
//   $.ajax({
//     url: "/posts",
//     dataType: "JSON",
//     method: "get"
//   }).success(function(data){
//     posts= data;
//     initialize();
//     google.maps.event.addDomListener(window, 'load', initialize)
//   })
// })
