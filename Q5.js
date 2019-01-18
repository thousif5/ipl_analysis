var fs = require('fs');
var path = require('path');



function toReadCsvFiles(filePath) {
var f = fs.readFileSync(filePath, {
    encoding: 'utf-8'
});

f = f.split("\n");
headers = f.shift().split(",");
headers.splice(headers.length - 1, 1);
headers.push('fielder');
var matches = [];

f.forEach(function (d) {
    tmp = {};
    row = d.split(",");
    for (var i = 0; i < headers.length; i++) {
        tmp[headers[i]] = row[i];
    }
    matches.push(tmp);
});
return matches;
}
function topTenBatsmen(year) {
    var filePath = path.join(__dirname, './csvFiles/matches.csv');
    var matches=toReadCsvFiles(filePath);
    var file2Path = path.join(__dirname, './csvFiles/deliveries.csv');
    var deliveries=toReadCsvFiles(file2Path);
    var matchIds = [];
    var batsmen={};
    for(var i in matches) {
        if(matches[i]["season"] === year) {
            matchIds.push(matches[i]["id"]);
        }
    }
    
    for(var i in deliveries) {
        if(matchIds.includes(deliveries[i]["match_id"])) {
           if(batsmen.hasOwnProperty(deliveries[i]["batsman"])) {
               //console.log(deliveries[i]["balls"]);
               batsmen[deliveries[i]["batsman"]] += parseInt(deliveries[i]["batsman_runs"]);
           } 
           else batsmen[deliveries[i]["batsman"]] = 0;
        }
    }

    //console.log(batsmen);
    var topTenBats={};
    var topSort=[];
    for (var i in batsmen) {
        topSort.push([i, batsmen[i]]);
    }
    topSort.sort(function(a,b) {
        return b[1] - a[1];
    })
    for (var j=0;j<10;j++) {
      topTenBats[topSort[j][0]]=topSort[j][1];
    }
    console.log(topTenBats);


}

// console.log("Top ten batsmen in the year of 2017");
// console.log();
 topTenBatsmen("2017");