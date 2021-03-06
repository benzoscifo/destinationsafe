 var infoWindow = null;




function initialize() {
  var infowindow = new google.maps.InfoWindow({
    content: "holding"
  })

  var myCenter=new google.maps.LatLng(51.508742,-0.120850);

  var mapProp = {
    center: myCenter,
    zoom:11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var markers = [];
  var map = new google.maps.Map(document.getElementById('googleMap'),mapProp)
 
  
  

  var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(51.507351, -0.127758),
  new google.maps.LatLng(51.507351, -0.127758));

  // map.fitBounds(defaultBounds);
  // Create the search box and link it to the UI element.
  var input = (document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(input);

    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">DestinationSafe?</h1>'+
        '<div id="bodyContent">'+
        '<p><b>About:</b> </br> ' +
        'Search cities, towns, suburbs and click on the markers '+
        'to see the most up-to-date information on safety and security. </br> '+
        '<p><b>Travelled recently?</b> </br>' +
        'Leave a post or comment to tell others how you found it. </br> '
        '</p>'+
        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: myCenter,
        map: map,
        title: 'About'
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });


//adding names to comments
function moveToPosition(place, bounds){
  console.log('top of moveToPosition', place, bounds);
  var infobody = place.body;
  var infopostuser = place.user ? place.user.name : "No user linked";
  var infotitle = place.title;
  var infouser = 1;
  var comments = '';
  if (place.comments && place.comments.length > 0){
    $.each(place.comments, function(index, comment){
       comments += '<p class= info_window_comment>' + comment.body + '</p>';
      if(comment.user){
        comments += '<h5 class= info_window_comment_user>' + comment.user.name + '</h5>'; 
      }
      
    });


  }
  if(place.latitude && place.longitude){
    var markerLocation = new google.maps.LatLng(place.latitude, place.longitude)
  }else{
    //Mathilda, I had to change this form location B to location D.....
    var markerLocation = new google.maps.LatLng(place.geometry.location.k, place.geometry.location.D)
  }

  if(infobody && infotitle){
    var information = "<h3>" + infotitle +"</h3><br><p>" + infobody + "</p><h5>"+infopostuser +"</h5><h3>Comments</h3>"+ comments +"<div id='comment_box'></div> " + "<form accept-charset='UTF-8' action='/comments.js' class='new_comment' id='new_comment' data-remote='true' method='post'>" + 
    "<div style='margin:0;padding:0;display:inline'>" + 
    "<input name='utf8' type='hidden' value='✓'>" + 
    "<input name='authenticity_token' type='hidden' value='J38zRKZvPQL18K39UtBXoAx0NYIG3kxeNJZNXkUxOjg='>" +
    "</div>" +
    "<input id='comment_post_id' name='comment[post_id]' type='hidden' value='" +place.id+"'>" +
    "<p>" +
    "<label for='comment_body'>New comment</label><br>" +
    "<textarea cols='40' id='comment_body' name='comment[body]' rows='20'></textarea>" +
    "</p>" +
    "<p><input name='commit' type='submit' value='Add comment'></p>" +
    "</form>" +
    "<a href='/posts/" + place.id + "'>Comments page</a>"

    var markerInfoWindow = new google.maps.InfoWindow({
      content: information
    });
    // get request 
    // Create a marker for each place.
    var marker = new google.maps.Marker({
      map: map,
      infowindow: markerInfoWindow,
      title: place.title,
      position: markerLocation
    });

    markers.push(marker);
  }
  console.log('line 81')
  bounds.extend(markerLocation);

  return bounds;
}

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    console.log(places);
    var address = places[0].name;
    $.ajax({
      url: "/findposts",
      dataType: "JSON",
      method: "post",
      data: {address: address}
    }).success(function(data){
      var bounds = new google.maps.LatLngBounds();
      // console.log(data)
      //If there is not data return from the server;
      console.log(data, 'what is the length of the data');
      if (data.length == 0) {
        moveToPosition(places[0], bounds)

      }
      //Clearing previous markers from the page;
      for (var i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(null);
      }

      //For each place, get the icon, place name, and location.
      markers = [];

      // settings markers for places returned by the server
      for (var i = 0, place; place = data[i]; i++) {
        moveToPosition(place, bounds)
      }


      for (var i = 0; i < markers.length; i++)  {
        var marker = markers[i];
        google.maps.event.addListener(marker, 'click', function () {
           infowindow.setContent(this.infowindow.content);
           infowindow.open(map, marker);
        });
      }

      map.fitBounds(bounds);
      map.setZoom(11)

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
