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
function teamsWinCount() {
    var filePath = path.join(__dirname, './csvFiles/matches.csv');
    var matches=toReadCsvFiles(filePath);
    var winCount={};
    for(var i in matches) {
        
        if(matches[i]["winner"] !== ""){ 
        if(winCount.hasOwnProperty(matches[i]["winner"])) {
            (winCount[matches[i]["winner"]].hasOwnProperty(matches[i]["season"])) ? winCount[matches[i]["winner"]][matches[i]["season"]] ++ : 
            winCount[matches[i]["winner"]][matches[i]["season"]] = 1;
        }
         else winCount[matches[i]["winner"]] = {};
    }
    }
    console.log(winCount);
}

// console.log("Stacked bar chart of matches won of all teams over all the years of IPL");
// console.log();
 teamsWinCount();