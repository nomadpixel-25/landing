let map;
let directionsService;
let directionsRenderer;

function initMap() {
  // Initialize the map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: { lat: 40.730610, lng: -73.935242 },  // Default center to NYC
    mapTypeId: 'roadmap'
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
}

function calculateRoute() {
  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;

  if (!origin || !destination) {
    alert('Please enter both origin and destination.');
    return;
  }

  const request = {
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.WALKING,
    unitSystem: google.maps.UnitSystem.METRIC,
    optimizeWaypoints: true,
    provideRouteAlternatives: true,
  };

  // Request the walking directions
  directionsService.route(request, (response, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(response);
      estimateWalkDuration(response);
    } else {
      alert('Directions request failed due to ' + status);
    }
  });
}

function estimateWalkDuration(response) {
  const route = response.routes[0];
  const legs = route.legs;
  let totalDuration = 0;
  for (let i = 0; i < legs.length; i++) {
    totalDuration += legs[i].duration.value;
  }
  
  // Convert seconds to minutes
  const walkDurationInMinutes = totalDuration / 60;
  alert('Estimated Walk Duration: ' + walkDurationInMinutes.toFixed(2) + ' minutes');
  
  // Adjust the route to be around 15 minutes if necessary
  if (walkDurationInMinutes < 15) {
    alert('The generated route is shorter than 15 minutes. You can adjust the origin or destination.');
  }
}
