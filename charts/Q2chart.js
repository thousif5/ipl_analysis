function getFiles(path) {
    var fileItems = [];
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            fileItems = JSON.parse(this.responseText);
        }
    };
    request.open("GET", path, false);
    request.send();
    return fileItems;
  }
  function draw() {
      var matchData=getFiles("file:///C:/Users/Thousif/ipl_stats/jsonFiles/matchesWonPerYear.json")
      Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Stacked bar chart'
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            data:matchData
        }]
    });
    
    
  }

  draw();