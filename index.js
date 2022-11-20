function loadBarGraph() {
    chart.options.data[0].dataPoints = [];
  var e = document.getElementById("dd");
    var selected = e.options[e.selectedIndex].value;
  var dps = jsonData[selected];
  for(var i in dps) {
      var xVal = dps[i].x;
    chart.options.data[0].dataPoints.push({label: xVal, y: dps[i].y});
  }
  chart.render();
}


var jsonData = {
    "dt": [
        { "x": "Saturday", "y": 2 },
        { "x": "Sunday", "y": 6 },
        { "x": "Monday", "y": 3 },
        { "x": "Tuesady", "y": 2 },
        { "x": "Wednesday", "y": 5 },
        { "x": "Thursday", "y": 4 },
        { "x": "Friday", "y": 7 },
    ],
    "wt": [
        { "x": "Saturday", "y": 10000 },
        { "x": "Sunday", "y": 11000 },
        { "x": "Monday", "y": 10400 },
        { "x": "Tuesady", "y": 12000 },
        { "x": "Wednesday", "y": 8000 },
        { "x": "Thursday", "y": 9500 },
        { "x": "Friday", "y": 10800 },
    ]}
    var dataPoints = [];
    var chart = new CanvasJS.Chart("chartContainer",
    {
        data: [{
        type: 'column',
        showInLegend: true,
        legendText: "Day of the week",
        dataPoints: dataPoints // this should contain only specific serial number data
        }]
    });
    
$( ".dropdown" ).change(loadBarGraph);

$(document).ready(loadBarGraph)
