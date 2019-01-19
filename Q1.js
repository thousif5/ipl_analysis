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

//Q1:

function noOfMatches() {
    var filePath = path.join(__dirname, './csvFiles/matches.csv');
    var matches=toReadCsvFiles(filePath);
    var obj1={};
 for(var i in matches) {
   (obj1.hasOwnProperty(matches[i].season)) ? obj1[matches[i].season]++ : obj1[matches[i].season] = 1;
}
//console.log(obj1);
//  var nom = JSON.stringify(obj1);
// console.log(nom);
var arr = [];
     for (var i in obj1) {
       var obj = {};
       obj["name"] = i;
       obj["y"] = obj1[i];
       arr.push(obj);
     }
     console.log(arr);
     require("fs").writeFile(
       "./jsonFiles/matchesWonPerYear.json",
       JSON.stringify(arr, null, 4),
       err => {
         if (err) {
           console.log(err);
           return;
         }
       }
     )

}



//Q: 
// console.log("Number of matches played per year of all the years in IPL");
// console.log();
 noOfMatches();

