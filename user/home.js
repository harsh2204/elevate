function loadBarGraph() {
  chart.data.datasets[0].data = [];
  var e = document.getElementById("dd");
  var selected = e.options[e.selectedIndex].value;
  var dps = jsonData[selected];
  for(var i in dps) {
    chart.data.datasets[0].data.push(dps[i]);
  }
  chart.update();
}

var jsonData = {
  "dt": [2, 6, 3 ,2 ,5 , 4 ,7],
  "wt": [ 10000, 11000, 10400, 12000, 8000, 9500, 10800]
}

var dataPoints = [];

const ctx = document.getElementById('chartContainer');
  
var chart = new Chart(ctx,{
  type: 'bar',
  data: {
    labels: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [{
      label: '',
      data: [],
      borderWidth: 1
    }]
  },
  options: {
    plugins: {
      legend: {
        display: false
      }
    }
  }
});
  
$( ".dropdown" ).change(loadBarGraph);

$(document).ready(loadBarGraph)