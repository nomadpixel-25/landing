import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

const WalkingRoutePlanner = () => {
  const [address, setAddress] = useState('');
  const [duration, setDuration] = useState(30);
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const mapRef = useRef(null);
  const autocompleteInputRef = useRef(null);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


  // Initialize Google Maps
  useEffect(() => {
    // Check if the Google Maps script is already loaded
    if (!window.google) {
      // Create a script element
      const script = document.createElement('script');
      // The actual API key would be fetched from an environment variable or backend
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = initializeMap;
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    } else {
      initializeMap();
    }
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;
    
    const mapOptions = {
      center: { lat: 51.5074, lng: -0.1278 }, // Default to London
      zoom: 13,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
    };
    
    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);
    
    // Initialize DirectionsService and DirectionsRenderer
    const newDirectionsService = new window.google.maps.DirectionsService();
    setDirectionsService(newDirectionsService);
    
    const newDirectionsRenderer = new window.google.maps.DirectionsRenderer({
      map: newMap,
      draggable: true,
      suppressMarkers: false,
    });
    setDirectionsRenderer(newDirectionsRenderer);
    
    // Initialize Autocomplete for address input
    const newAutocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current);
    newAutocomplete.bindTo('bounds', newMap);
    setAutocomplete(newAutocomplete);
    
    // Add event listener for place changed
    newAutocomplete.addListener('place_changed', () => {
      const place = newAutocomplete.getPlace();
      if (!place.geometry) {
        setError('No location details available for this address.');
        return;
      }
      
      // Set the map to the new location
      newMap.setCenter(place.geometry.location);
      newMap.setZoom(15);
      
      // Update the address state
      setAddress(place.formatted_address);
    });
    
    // Add click listener to the map
    newMap.addListener('click', (event) => {
      // Get the clicked location
      const clickedLocation = event.latLng;
      
      // Reverse geocode to get the address
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: clickedLocation }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setAddress(results[0].formatted_address);
          
          // Center the map on the clicked location
          newMap.setCenter(clickedLocation);
        } else {
          setError('Could not find address for this location.');
        }
      });
    });
  };

  // Calculate walking routes
  const calculateRoutes = () => {
    if (!directionsService || !directionsRenderer || !address) {
      setError('Please provide a valid starting point.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Convert duration to seconds (approx walking speed of 5km/h)
    const durationInSeconds = duration * 60;
    const walkingDistanceMeters = (5000 / 3600) * durationInSeconds;
    
    // Geocode the address to get coordinates
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status !== 'OK' || !results[0]) {
        setLoading(false);
        setError('Could not find coordinates for this address.');
        return;
      }
      
      const startLocation = results[0].geometry.location;
      
      // Generate waypoints in different directions
      const numDirections = 4;
      const angleStep = 360 / numDirections;
      
      // Create promises for each direction
      const routePromises = Array(numDirections).fill().map((_, index) => {
        return new Promise((resolve) => {
          // Calculate waypoint in this direction
          const angle = index * angleStep * (Math.PI / 180);
          const waypointLat = startLocation.lat() + (walkingDistanceMeters / 2 / 111000) * Math.cos(angle);
          const waypointLng = startLocation.lng() + (walkingDistanceMeters / 2 / 111000) * Math.sin(angle) / Math.cos(startLocation.lat() * (Math.PI / 180));
          
          const waypoint = new window.google.maps.LatLng(waypointLat, waypointLng);
          
          // Request directions
          directionsService.route({
            origin: startLocation,
            destination: startLocation,
            waypoints: [{ location: waypoint, stopover: true }],
            travelMode: 'WALKING',
            optimizeWaypoints: true,
            provideRouteAlternatives: true,
          }, (response, routeStatus) => {
            if (routeStatus === 'OK' && response.routes.length > 0) {
              // Add estimated duration to each route
              const routes = response.routes.map(route => {
                let totalDuration = 0;
                route.legs.forEach(leg => {
                  totalDuration += leg.duration.value;
                });
                return {
                  ...route,
                  totalDurationText: Math.round(totalDuration / 60) + ' min',
                  totalDurationValue: totalDuration,
                  direction: index
                };
              });
              resolve(routes);
            } else {
              resolve([]);
            }
          });
        });
      });
      
      // Wait for all routes to be calculated
      Promise.all(routePromises).then((results) => {
        // Flatten the array of route arrays
        const allRoutes = results.flat();
        
        // Sort routes by how close they are to the requested duration
        allRoutes.sort((a, b) => {
          const aDiff = Math.abs(a.totalDurationValue - durationInSeconds);
          const bDiff = Math.abs(b.totalDurationValue - durationInSeconds);
          return aDiff - bDiff;
        });
        
        setRoutes(allRoutes);
        setSelectedRouteIndex(0);
        
        if (allRoutes.length > 0) {
          directionsRenderer.setDirections({ routes: [allRoutes[0]] });
          directionsRenderer.setRouteIndex(0);
        } else {
          setError('Could not find suitable walking routes. Try a different location or duration.');
        }
        
        setLoading(false);
      });
    });
  };

  // Select a different route
  const selectRoute = (index) => {
    setSelectedRouteIndex(index);
    directionsRenderer.setDirections({ routes: [routes[index]] });
    directionsRenderer.setRouteIndex(0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Circular Walking Route Planner</h1>
      </header>
      
      <main className="flex flex-col md:flex-row flex-1">
        <div className="w-full md:w-1/3 p-4 bg-gray-100">
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Starting Point (Point A)
            </label>
            <div className="relative">
              <input
                ref={autocompleteInputRef}
                type="text"
                id="address"
                className="w-full p-2 pr-10 border rounded-md"
                placeholder="Enter address or click on map"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Walk Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              min="5"
              max="180"
              className="w-full p-2 border rounded-md"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
            />
          </div>
          
          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            onClick={calculateRoutes}
            disabled={loading || !address}
          >
            {loading ? 'Calculating...' : 'Find Walking Routes'}
          </button>
          
          {error && (
            <div className="mt-4 p-2 bg-red-100 text-red-800 rounded-md">
              {error}
            </div>
          )}
          
          {routes.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-medium mb-2">Available Routes</h2>
              <div className="space-y-2">
                {routes.slice(0, 5).map((route, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md cursor-pointer ${
                      selectedRouteIndex === index ? 'bg-blue-100 border border-blue-300' : 'bg-white border'
                    }`}
                    onClick={() => selectRoute(index)}
                  >
                    <div className="font-medium">Route {index + 1}</div>
                    <div className="text-sm text-gray-600">
                      Duration: {route.totalDurationText}
                    </div>
                    <div className="text-sm text-gray-600">
                      Distance: {route.legs[0].distance.text + (route.legs[1] ? ' + ' + route.legs[1].distance.text : '')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-6 text-sm text-gray-600">
            <p>Instructions:</p>
            <ol className="list-decimal pl-5 space-y-1 mt-1">
              <li>Enter your starting address or click on the map</li>
              <li>Set your desired walking time in minutes</li>
              <li>Click "Find Walking Routes" to see circular routes</li>
              <li>Select different suggested routes from the list</li>
              <li>You can also drag the route on the map to customize it</li>
            </ol>
          </div>
        </div>
        
        <div className="w-full md:w-2/3 h-screen md:h-auto">
          <div ref={mapRef} className="w-full h-full min-h-screen md:min-h-0"></div>
        </div>
      </main>
    </div>
  );
};

export default WalkingRoutePlanner;
