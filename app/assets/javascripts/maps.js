 var infoWindow = null;

function initialize() {
  var infowindow = new google.maps.InfoWindow({
    content: "holding"
  })

  var markers = [];
  var map = new google.maps.Map(document.getElementById('googleMap'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });


  var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(51.507351, -0.127758),
  new google.maps.LatLng(51.507351, -0.127758));
  map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = (document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(input);

  

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
      // console.log(data)
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

      var bounds = new google.maps.LatLngBounds();
      for (var i = 0, place; place = data[i]; i++) {
        // debugger;
        var infobody = place.body;
        var infotitle = place.title;
        var infouser = 1;
        var comments = '';
        if (place.comments.length > 0){
          $.each(place.comments, function(index, comment){
            comments += '<p>' + comment.body + '</p>'; 
          });
        }
        
        var information = infotitle.concat("<h3>" + infobody + "</h3><h3>Comments</h3>"+ comments + "<a href='/comments/new?post_id=" + place.id + "'>New comment</a>");

        var markerInfoWindow = new google.maps.InfoWindow({
          content: information
        });
        // get request 
        // Create a marker for each place.
        var marker = new google.maps.Marker({
          map: map,
          infowindow: markerInfoWindow,
          title: place.title,
          position: new google.maps.LatLng(place.latitude, place.longitude)
        });

        markers.push(marker);

        bounds.extend(new google.maps.LatLng(place.latitude, place.longitude));
      }


      for (var i = 0; i < markers.length; i++)  {
        var marker = markers[i];
        google.maps.event.addListener(marker, 'click', function () {
          console.log(this);
           infowindow.setContent(this.infowindow.content);
           infowindow.open(map, this);
        });
      }

      map.fitBounds(bounds);

    });
});

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    map.setZoom(9);
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}

window.onload = function(){
  initialize();

};


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
