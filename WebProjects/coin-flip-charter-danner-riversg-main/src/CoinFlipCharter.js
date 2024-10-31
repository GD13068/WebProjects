// Class: SWE2511 - Coin Flip Charter
// Name: Gavin Danner-Rivers
// Class Section: 121

/**
 * chartSetup
 * Set up the Google chart properties and other page events
 */
const chartSetup = () => {

    // Initialize the Google chart package
    google.charts.load('current', {packages: ['corechart', 'bar', 'table']});
    google.charts.setOnLoadCallback(createDefaultDisplay);

    // Set up the button handler to call a function that updates the page
    document.getElementById("update").onclick = updateDisplay;
};

/**
 * createDefaultDisplay
 * Create the "default" page - display all data with no filters
 */
const createDefaultDisplay = () => {
    // Set up and add rows to the data
    const chartData = new google.visualization.DataTable();
    const tableData = new google.visualization.DataTable();

    // Add columns to the data
    chartData.addColumn('string', 'Index');
    chartData.addColumn('number', 'Time');

    tableData.addColumn('string', 'Index');
    tableData.addColumn('string', 'ID');
    tableData.addColumn('number', 'Coins');
    tableData.addColumn('number', 'Flips');
    tableData.addColumn('string', 'Browser');
    tableData.addColumn('number', 'Time');

    for (let i=0; i<results.length; i++) {
        let currentRow = results[i];
        chartData.addRow(["" + (i+1), currentRow.time]);
        tableData.addRow(["" + (i+1), currentRow.id, currentRow.coins, currentRow.flips, currentRow.browser, currentRow.time]);
    }

    drawChartAndTable(chartData, tableData);
};

/**
 * drawChartAndTable
 * Display the given data in the chart and table
 */
const drawChartAndTable = (chartData, tableData) => {
    // Options for the chart and table
    const chartOptions = {
        width: 1200,
        height: 400,
        legend: 'top',
        colors: ['#fcba03'],
    };

    const tableOptions = {
        width: 600,
        alternatingRowStyle: true,
        cssClassNames: {
            'headerRow': 'tableHeaderStyle',
            'oddTableRow': 'tableOddRowStyle',
        },
    };

    // Display the chart
    const chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(chartData, chartOptions);

    // Display the table
    const table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(tableData, tableOptions);
};

const updateDisplay = () => {

    // Determine which radio button is currently selected.
    let radios = document.getElementsByName("filters");
    let selection = "id";
    for (let i=0; i<radios.length; i++) {
        if (radios[i].checked) {
            selection = radios[i].id;
        }
    }

    // Retrieve the filter expression to determine what rows of the result set to show and hide.
    let filter = document.getElementById("filter").value;

    // Set up the data
    const chartData = new google.visualization.DataTable();
    const tableData = new google.visualization.DataTable();

    // Add columns to the data
    chartData.addColumn('string', 'Index');
    chartData.addColumn('number', 'Time');

    tableData.addColumn('string', 'Index');
    tableData.addColumn('string', 'ID');
    tableData.addColumn('number', 'Coins');
    tableData.addColumn('number', 'Flips');
    tableData.addColumn('string', 'Browser');
    tableData.addColumn('number', 'Time');

    // Iterate through the results object elements filtering based on filter value and type
    // Create a new "filteredData" object to be used by Google charts based on the filter value
    //    i.e. repopulate it with only the data that the filter does not remove

    for (let i=0; i<results.length; i++) {
        let currentRow = results[i];
        if (filter.length === 0) {
            chartData.addRow(["" + (i+1), currentRow.time]);
            tableData.addRow(["" + (i+1), currentRow.id, currentRow.coins, currentRow.flips, currentRow.browser, currentRow.time]);
        } else if (selection === "id" && currentRow.id.includes(filter)) {
            chartData.addRow(["" + (i+1), currentRow.time]);
            tableData.addRow(["" + (i+1), currentRow.id, currentRow.coins, currentRow.flips, currentRow.browser, currentRow.time]);
        } else if (selection === "coins" && currentRow.coins === parseFloat(filter)) {
            chartData.addRow(["" + (i+1), currentRow.time]);
            tableData.addRow(["" + (i+1), currentRow.id, currentRow.coins, currentRow.flips, currentRow.browser, currentRow.time]);
        } else if (selection === "flips" && currentRow.flips === parseFloat(filter)) {
            chartData.addRow(["" + (i+1), currentRow.time]);
            tableData.addRow(["" + (i+1), currentRow.id, currentRow.coins, currentRow.flips, currentRow.browser, currentRow.time]);
        } else if (selection === "browser" && currentRow.browser.includes(filter)) {
            chartData.addRow(["" + (i+1), currentRow.time]);
            tableData.addRow(["" + (i+1), currentRow.id, currentRow.coins, currentRow.flips, currentRow.browser, currentRow.time]);
        }
    }

    drawChartAndTable(chartData, tableData);
};

window.onload = () => {
    chartSetup();
};
