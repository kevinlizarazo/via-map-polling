var key = process.env.ACCESS_TOKEN;
var map = L.map('map').setView([41.91404062230647,-87.65866755000002], 11); //Initialize the map
map.createPane('labels');
map.getPane('labels').style.zIndex = 650;
map.getPane('labels').style.pointerEvents = 'none';
var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '©OpenStreetMap, ©CartoDB'
}).addTo(map);

//Add a basemap
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token='+key, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light-v9_nolabels',
    accessToken: key
}).addTo(map);

// Set hover colors
function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
  weight: 3,
  opacity: 1,
  fillColor: 'white'
  });
}
// A function to reset the colors when a neighborhood is not longer 'hovered'
function resetHighlight(e) {
  var layer = e.target;
  layer.setStyle({
  weight: 3,
  opacity: 1,
  fillColor: '#faebd7'
  });
}

function onEachFeature(feature, layer) {

  var name = feature.properties.Name;
  var container = $('<div />');

  if (name !== "Current Service Area"){
    container.on('click', '#vote', function(event) {
        event.preventDefault();
    });
    container.html(`<h4>` + name + `</h3><p>Enter your email below:</p><input type="email" size="32" maxLength="32" required placeholder="email@example.com" id="email" style="color:black;"></input><form id="vote"><button type="submit" id="submit" class="btn btn-default btn-sm" style="margin-top: 12px;">Submit</button></form>`);
    layer.bindPopup(container[0]);
  } 
  else {
    container.html(`<img src="img/Via_Logo_White_Stacked.png" height="100"/> <h4>` + name + `</h4>`);
    layer.bindPopup(container[0]);
  }

  layer.on({
   mouseover: highlightFeature,
   mouseout: resetHighlight
   });
  
}

var expansionZone = {
  "fillColor":"#faebd7",
  "fillOpacity": "0.8",
  "color": "#1FB7E9"
}

var currentZone = {
  "fillColor":"#faebd7",
  "fillOpacity": "0.8",
  "color": "#f59121"
}

data = L.geoJSON(neighborhoods, {
  style: expansionZone,
  onEachFeature: onEachFeature
}).addTo(map);

data = L.geoJSON(currentService, {
  style: currentZone,
  onEachFeature: onEachFeature
}).addTo(map);
