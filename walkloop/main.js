
function myMap() {
    var mapProp = {
        center:new google.maps.LatLng(51.508742,-0.120850),
        zoom:5,
    };
    
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    var marker = new google.maps.Marker({
        position: mapProp.center,
        // icon:'pinkball.png',
        animation:google.maps.Animation.DROP,
        title: 'Hello World!',
        map: map,
    });
    var myTrip = [stavanger,amsterdam,london];
    var flightPath = new google.maps.Polyline({
      path:myTrip,
      strokeColor:"#0000FF",
      strokeOpacity:0.8,
      strokeWeight:2
    });
    flightPath.setMap(map);
    // marker.setMap(map); // this is the line that adds the marker to the map
    };

console.log('hello world');
