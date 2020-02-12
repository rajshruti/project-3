var myMap = L.map("map", {
  center: [43.6532, -79.3832],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


/*var geojsonFeature  = "https://opendata.arcgis.com/datasets/af500b5abb7240399853b35a2362d0c0_0.geojson";

d3.json(geojsonFeature, function(data) {
L.geoJson(data).addTo(myMap);
*/

var url="http://127.0.0.1:5000/api/heatmap"


d3.json(url, function(data) {
    var heatArray = [];

    for (var i = 0; i < data.length; i++) {
      var location = data[i].coordinates;
      if (location) {
        heatArray.push([location[0], location[1]]);
      }
    }
    var heat = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
    }).addTo(myMap);    
}); 