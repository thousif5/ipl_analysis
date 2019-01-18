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
function theEconomicBowlers (year) {
    var filePath = path.join(__dirname, './csvFiles/matches.csv');
    var matches=toReadCsvFiles(filePath);
    var file2Path = path.join(__dirname, './csvFiles/deliveries.csv');
    var deliveries=toReadCsvFiles(file2Path);
    var matchIds = [];
    var bowlers={};
    for(var i in matches) {
        if(matches[i]["season"] === year) {
            matchIds.push(matches[i]["id"]);
        }
    }
    
   for( var i in deliveries) {
       if(deliveries[i]["wide_runs"] === "0" && deliveries[i]["noball_runs"] === "0") {
            if(matchIds.includes(deliveries[i]["match_id"])) {
           
               if(bowlers.hasOwnProperty(deliveries[i]["bowler"])) { 
                   bowlers[deliveries[i]["bowler"]] += 1; 
               }
               else bowlers[deliveries[i]["bowler"]] = 0;
           
           }
    }
   }

    


    var bowlersRuns={};
    for(var i in deliveries) {
        if(matchIds.includes(deliveries[i]["match_id"])) {
           if(bowlersRuns.hasOwnProperty(deliveries[i]["bowler"])) {
               bowlersRuns[deliveries[i]["bowler"]] += parseInt(deliveries[i]["total_runs"]);
           } 
           else bowlersRuns[deliveries[i]["bowler"]] = 0;
        }
    }
    

    //console.log(bowlers);
    var econBowlers={};
    for (const key in bowlersRuns) {
        //console.log(bowlersRuns[key],bowlers[key]);
      econBowlers[key] = (bowlersRuns[key]/(bowlers[key]/6)).toFixed(2);
    }
    //console.log(econBowlers);
     

    var topTen={};
    var toSort=[];
    for (var i in econBowlers) {
        toSort.push([i, econBowlers[i]]);
    }
    toSort.sort(function(a,b) {
        return a[1] - b[1];
    })
    for (var j=0;j<10;j++) {
      topTen[toSort[j][0]]=toSort[j][1];
    }
    console.log(topTen);
    //  console.log(bowlers);
    // console.log(bowlersRuns);
}

// console.log("Top ten economic bowlers in the year of 2015");
// console.log();
theEconomicBowlers("2015");