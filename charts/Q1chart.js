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
      var matchData=getFiles("file:///C:/Users/Thousif/ipl_stats/jsonFiles/matchesPlayedPerYear.json")
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Matches played per year'
        },
        subtitle: {
            text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Match played'
            }
    
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },
    
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
    
        "series": [
           { data:matchData   }
            ]
    });
  }

  draw();