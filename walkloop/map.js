let map;
let marker;
let infoWindow;
let center;

// Load the Places Library
// To load the Places Library, first load the Maps JavaScript API, by adding the inline bootstrap loader to your application code, as shown in the following snippet: 

// This example adds a marker to indicate the position of Bondi Beach in Sydney,
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
key: "AIzaSyCec2M2PampMVbG14FthTZUcYPHZItmv5c",
v: "beta",
// Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
// Add other bootstrap parameters as needed, using camel case.
});

const { Place } = await google.maps.importLibrary("places");

// Create the input HTML element, and append it.
//@ts-ignore
// const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement();

//@ts-ignore
// const placeAutocomplete = new google.maps.places.Autocomplete(document.createElement('input'));

//@ts-ignore
const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement();

//@ts-ignore
placeAutocomplete.id = "place-autocomplete-input";

const card = document.getElementById("place-autocomplete-card");

//@ts-ignore
card.appendChild(placeAutocomplete);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

const pac = new google.maps.places.PlaceAutocompleteElement({
    locationRestriction: map.getBounds(),
  });

    map.addListener("bounds_changed", () => {
    pac.locationRestriction = map.getBounds();
    }
);



async function initMap() {
  // Request needed libraries.
  //@ts-ignore
  const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
    google.maps.importLibrary("marker"),
    google.maps.importLibrary("places"),
  ]);

  // Initialize the map.
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.749933, lng: -73.98633 },
    zoom: 13,
    mapId: "4504f8b37365c3d0",
    mapTypeControl: false,
  });

  //@ts-ignore
  const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement();

  //@ts-ignore
  placeAutocomplete.id = "place-autocomplete-input";

  const card = document.getElementById("place-autocomplete-card");

  //@ts-ignore
  card.appendChild(placeAutocomplete);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
  // Create the marker and infowindow
  marker = new google.maps.marker.AdvancedMarkerElement({
    map,
  });
  infoWindow = new google.maps.InfoWindow({});
  // Add the gmp-placeselect listener, and display the results on the map.
  //@ts-ignore
  placeAutocomplete.addEventListener("gmp-placeselect", async ({ place }) => {
    await place.fetchFields({
      fields: ["displayName", "formattedAddress", "location"],
    });
    // If the place has a geometry, then present it on a map.
    if (place.viewport) {
      map.fitBounds(place.viewport);
    } else {
      map.setCenter(place.location);
      map.setZoom(17);
    }

    let content =
      '<div id="infowindow-content">' +
      '<span id="place-displayname" class="title">' +
      place.displayName +
      "</span><br />" +
      '<span id="place-address">' +
      place.formattedAddress +
      "</span>" +
      "</div>";

    updateInfoWindow(content, place.location);
    marker.position = place.location;
  });
}

// Helper function to create an info window.
function updateInfoWindow(content, center) {
  infoWindow.setContent(content);
  infoWindow.setPosition(center);
  infoWindow.open({
    map,
    anchor: marker,
    shouldFocus: false,
  });
}

// initMap();


const request = {
    textQuery: "Tacos in Mountain View",
    fields: ["displayName", "location", "businessStatus"],
    includedType: "restaurant",
    locationBias: { lat: 37.4161493, lng: -122.0812166 },
    isOpenNow: true,
    language: "en-US",
    maxResultCount: 8,
    minRating: 3.2,
    region: "us",
    useStrictTypeFiltering: false,
  };
  //@ts-ignore
const { places } = await Place.searchByText(request);
console.log(places);
// places is an array of Place objects that match the search criteria.

// The following example shows how to use the Places Library to search for places that match the search criteria "Tacos in Mountain View". The searchByText method is called with a request object that specifies the search criteria. The response object contains an array of Place objects that match the search criteria. The Place object contains information about the place, such as its name, location, and business status.


async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    center = { lat: 37.4161493, lng: -122.0812166 };
    map = new Map(document.getElementById("map"), {
    center: center,
    zoom: 11,
    mapId: "DEMO_MAP_ID",
    });
    findPlaces();
}

async function findPlaces() {
    const { Place } = await google.maps.importLibrary("places");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const request = {
    textQuery: "Tacos in Mountain View",
    fields: ["displayName", "location", "businessStatus"],
    includedType: "restaurant",
    locationBias: { lat: 37.4161493, lng: -122.0812166 },
    isOpenNow: true,
    language: "en-US",
    maxResultCount: 8,
    minRating: 3.2,
    region: "us",
    useStrictTypeFiltering: false,
    };
    //@ts-ignore
    const { places } = await Place.searchByText(request);

    if (places.length) {
    console.log(places);

    const { LatLngBounds } = await google.maps.importLibrary("core");
    const bounds = new LatLngBounds();

    // Loop through and get all the results.
    places.forEach((place) => {
        const markerView = new AdvancedMarkerElement({
        map,
        position: place.location,
        title: place.displayName,
        });

        bounds.extend(place.location);
        console.log(place);
    });
    map.fitBounds(bounds);
    } else {
    console.log("No results");
    }
}

initMap();