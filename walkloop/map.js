document.addEventListener('DOMContentLoaded', function() {
    loadScript();
});

// Description: JavaScript file for the WalkLoop map page.
// Load the Google Maps API script dynamically
function loadScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCec2M2PampMVbG14FthTZUcYPHZItmv5c&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Call the loadScript function to load the Google Maps API
loadScript();
let map;
let directionsService;
let directionsRenderer;
let autocomplete;
let places;

// Initialize the map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 }, // Default center, will update based on input
    zoom: 14
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
    map: map
    });
    // Initialize Autocomplete for the input field
    const input = document.getElementById('startPoint');
    autocomplete = new google.maps.places.Autocomplete(input);

    // Bias the autocomplete predictions to the current map viewport
    autocomplete.setBounds(map.getBounds());
}
// Function to create a walking route
function createWalkingRoute() {
    const startPoint = document.getElementById('startPoint').value;
    if (!startPoint) {
    alert('Please enter a starting point');
    return;
    }

    // Geocode the starting point address to get lat/lng
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: startPoint }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
        const origin = results[0].geometry.location;
        
        // Use Directions API to create a walking route
        const request = {
        origin: origin,
        destination: origin,  // Start and end at the same point
        travelMode: google.maps.TravelMode.WALKING,
        waypoints: [],  // No intermediate waypoints for a simple loop
        optimizeWaypoints: false,
        unitSystem: google.maps.UnitSystem.METRIC,
        provideRouteAlternatives: true
        };

        // Request the route
        directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            // Render the route
            directionsRenderer.setDirections(response);

            // Calculate total duration and adjust the route if necessary
            const routeDuration = response.routes[0].legs[0].duration.value / 60; // in minutes
            if (routeDuration < 20) {
            alert("The route is shorter than 20 minutes. You may need to modify the route manually.");
            } else if (routeDuration > 20) {
            alert("The route is longer than 20 minutes. Consider adjusting your parameters.");
            }
        } else {
            alert('Directions request failed due to ' + status);
        }
        });
    } else {
        alert('Geocode was not successful for the following reason: ' + status);
    }
    });
}

// Load the map on page load
window.onload = initMap;
