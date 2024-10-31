// Class: SWE2511 - Bird Visualizer
// Name: Gavin Danner-Rivers
// Class Section: 121

const eBirdAPI = "https://api.ebird.org/v2/data/obs/geo/recent";
const eBirdKey = "lfitr89eegj9";
let map;
let markers = [];

/**
 * displayError - Displays an error message
 * @param message - the message to display
 */
const displayError = (message) => {
    const errorMessage = document.getElementById("errorDisplay");
    errorMessage.innerText = message;
    errorMessage.classList.remove("visually-hidden");
    for (let i=0; i<markers.length; i++) {
        map.removeLayer(markers[i]);
    }
    document.getElementById("table").innerText = "";
};

/**
 * clearError - clears displaying of an error message
 */
const clearError = () => {
    const errorMessage = document.getElementById("errorDisplay");
    errorMessage.classList.add("visually-hidden");
    errorMessage.innerText = "";
};

/**
 * Update the map and data table
 * @param data the API data
 */
const updateMap = (data) => {
    clearError();

    for (let i=0; i<markers.length; i++) {
        map.removeLayer(markers[i]);
    }

    const tableData = new google.visualization.DataTable();

    tableData.addColumn('string', 'Name');
    tableData.addColumn('string', 'Scientific Name');
    tableData.addColumn('string', 'Location');
    tableData.addColumn('string', 'Sighting Count');
    tableData.addColumn('number', 'Latitude');
    tableData.addColumn('number', 'Longitude')

    for (let i=0; i<data.length; i++) {
        let currentSighting = data[i];
        let name = currentSighting.comName;
        let sciName = currentSighting.sciName;
        let location = currentSighting.locName;
        let count = currentSighting.howMany;
        let latitude = currentSighting.lat;
        let longitude = currentSighting.lng;
        let marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup("<table><tr><th>" + name + " Sighting:</th></tr>" +
            "<tr><td>Scientific Name: " + sciName + "</td></tr>" +
            "<tr><td>Location: " + location + "</td></tr>" +
            "<tr><td>Sighting Count: " + count + "</td></tr></table>");
        markers.push(marker)
        tableData.addRow([name, sciName, location, "" + count, latitude, longitude]);
    }

    const tableOptions = {
        width: 1000,
        alternatingRowStyle: true,
        cssClassNames: {
            'headerRow': 'tableHeaderStyle',
            'oddTableRow': 'tableOddRowStyle',
        },
    };

    // Display the table
    const dataView = new google.visualization.DataView(tableData);
    dataView.setColumns([0, 1, 2, 3]);

    const table = new google.visualization.Table(document.getElementById('table'));
    table.draw(dataView, tableOptions);

    google.visualization.events.addListener(table, 'select', () => {
        let selection = table.getSelection();
        let latitude = tableData.getFormattedValue(selection[0].row, 4);
        let longitude = tableData.getFormattedValue(selection[0].row, 5);
        map.panTo(new L.LatLng(latitude, longitude));
    });
};

/**
 * Make a request from the eBird API
 */
const makeRequest = () => {
    fetch(eBirdAPI + "?" + new URLSearchParams({
        lat: map.getCenter().lat,
        lng: map.getCenter().lng
    }), {
        method: 'GET',
        headers: {
            'X-eBirdApiToken': eBirdKey
        },
    }).then((response) => {
        if(response.status !== 200) {
            throw new Error(String(response.status));
        }
        return response.json();
    }).then((responseJSON) => updateMap(responseJSON))
        .catch((error) => displayError(error));
};

/**
 * window.onload - initializes a bird visualizer when the window loads
 */
window.onload = () => {

    // Initialize the map
    const startPoint = [43.044240, -87.906446]; // GPS lat/long location of MSOE athletic field

    map = L.map('map').setView(startPoint, 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    google.charts.load('current', {packages: ['table']});
    google.charts.setOnLoadCallback(makeRequest);

    map.on('move', () => {
        makeRequest();
    })
};