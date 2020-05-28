//initialize leaflet map object
var map = L.map('map', { center: [42.381899, -71.122499], zoom: 13 });

// Add Tile Layer basemap
L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png', {
    attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
    maxZoom: 17,
    minZoom: 9
}).addTo(map);

// Global Variables
// Will go here
var coffeShopLocations = null;

// Database Queries
// Will go here
//get all coffee cafes from table
var getAllCoffeeCafes = "SELECT * FROM coffee_cafes";

// Get all coffee cafes that have name 'Starbucks'
var getStarbucks = "SELECT * FROM coffee_cafes WHERE name = 'Starbucks'";

//Carto username
var cartoUsername = 'tcirose';

//getJSON function
function showAll() {
    $.getJSON("https://" + cartoUsername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + getAllCoffeeCafes, function(data) {
        coffeeShopLocations = L.geoJson(data, {
            onEachFeature: function(feature, layer) {
                layer.bindPopup('<p><b>' + feature.properties.name + '</b><br /><em>' + feature.properties.address + '</em></p>');
                layer.cartodb_id = feature.properties.cartodb_id;
            }
        }).addTo(map);
    });
};

// Run showAll function automatically when document loads
$(document).ready(function() {
    showAll();
});

//show Starbucks only
function showStarbucks() {
    if (map.hasLayer(coffeeShopLocations)) {
        map.removeLayer(coffeeShopLocations);
    };
    $.getJSON("https://" + cartoUsername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + getStarbucks, function(data) {
        coffeeShopLocations = L.geoJson(data, {
            onEachFeature: function(feature, layer) {
                layer.bindPopup('<p><b>' + feature.properties.name + '</b><br /><em>' + feature.properties.address + '</em></p>');
                layer.cartodb_id = feature.properties.cartodb_id;
            }
        }).addTo(map);
    });
};

//Add Event listeners(Activate buttons)
//starbucks button
$('input[value=starbucks]').click(function() {
    showStarbucks();
});
//all coffee cafes button
$('input[value=all]').click(function() {
    showAll();
});