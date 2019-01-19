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
function extraRuns(year) {
    var filePath = path.join(__dirname, './csvFiles/matches.csv');
    var matches=toReadCsvFiles(filePath);
    var file2Path = path.join(__dirname, './csvFiles/deliveries.csv');
    var deliveries=toReadCsvFiles(file2Path);
    var matchIds = [];
    for(var i in matches) {
        if(matches[i]["season"] === year) {
            matchIds.push(matches[i]["id"]);
        }
    }
    // console.log( matchIds)
    var extraRuns={};
    for (let i = 0; i < deliveries.length; i++) {
        if(matchIds.includes(deliveries[i]["match_id"])){
            (extraRuns.hasOwnProperty(deliveries[i]["bowling_team"])) ? extraRuns[deliveries[i]["bowling_team"]] += 
            parseInt(deliveries[i]["extra_runs"]) : extraRuns[deliveries[i]["bowling_team"]] = parseInt(deliveries[i]["extra_runs"]);
        }
    }
    // var xtraR=JSON.stringify(extraRuns);
    // console.log(xtraR);
    var arr = [];
     for (var i in extraRuns) {
       var obj = {};
       obj["name"] = i;
       obj["y"] = extraRuns[i];
       arr.push(obj);
     }
     console.log(arr);
     require("fs").writeFile(
       "./jsonFiles/extraRunsConceded.json",
       JSON.stringify(arr, null, 4),
       err => {
         if (err) {
           console.log(err);
           return;
         }
       }
     )
}

// console.log("Extra runs conceded per team in the year of 2016");
// console.log();
 extraRuns("2016");