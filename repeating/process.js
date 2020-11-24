var request = require('sync-request');
var auth = require('../auth.json');
var id = require('./id.json').id;
var res = new Map();

for(var j = 0; j < id.length; j++){
  var headers = {
      'authority': 'vjudge.net',
      'pragma': 'no-cache',
      'cache-control': 'no-cache',
      'accept': 'application/json, text/javascript, */*; q=0.01',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
      'x-requested-with': 'XMLHttpRequest',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://vjudge.net/contest/308456',
      'accept-language': 'en-US,en;q=0.9,id;q=0.8',
      'cookie': auth.auth
  };
  var temp = request('GET', "https://vjudge.net/contest/rank/single/" + id[j], {
    headers: headers
  });
  var contest = JSON.parse(temp.getBody());
  var duration = contest.length / 1000;
  var submission = contest.submissions;
  var participant = contest.participants;
  var vis = new Map();
  for(var i = 0; i < submission.length; i++){
    if(submission[i][2] == 0)continue;
    if(vis.has([submission[i][0], submission[i][1]]))continue;
    var cur = 0;
    if(res.has(participant[submission[i][0]][1]))cur = res.get(participant[submission[i][0]][1]);
    vis.set([submission[i][0], submission[i][1]], 1);
    if(submission[i][3] <= duration)continue;
    res.set(participant[submission[i][0]][1], cur + 100);
  }
}

var fs = require('fs');
var jsonObj = Object.fromEntries(res);
console.log(jsonObj);
var jsonContent = JSON.stringify(jsonObj);
fs.writeFileSync("./repeating/res.json", jsonContent, "utf8", function(err) {
  if (err) {
    console.log("An errr occured while writing JSON jsonObj to File.");
    return console.log(err);
  }
  console.log("saved");
});