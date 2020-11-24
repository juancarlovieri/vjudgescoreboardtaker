var tableImport = require('table');
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync("dir.json", "utf8"));
var dir = obj.dir;
const { table } = tableImport;
let data,
    output;


function cmp(a, b){
  console.log(a[1]);
  if(a[0] == "Names"){console.log("TES");return -1;}
  let comparison = 0;
  if (a[1] < b[1]) {
    comparison = 1;
  } else {
    comparison = -1;
  }
  return comparison;
}

data = [];

var vis = new Map();
var names = [];

for(var i = 0; i < dir.length; ++i){
  var res = new Map(Object.entries(JSON.parse(fs.readFileSync(dir[i] + "res.json", "utf8"))));
  // console.log(res);
  res.forEach(function lol(value, key){
    if(vis.has(key))return;
    vis.set(key, 1);
    names[names.length] = key;
  });
}

var head = ['Names'];
for(var i = 0; i < dir.length; ++i){
  head[head.length] = dir[i].substr(2, dir[i].length - 3);
}


for(var i = 0; i < names.length; ++i){
  data[data.length] = [names[i]];
}

for(var i = 0; i < dir.length; ++i){
  var res = new Map(Object.entries(JSON.parse(fs.readFileSync(dir[i] + "res.json", "utf8"))));
  console.log(dir[i]);
  console.log(res);
  for(var j = 0; j < data.length; ++j){
    console.log(data[j][0]);
    if(res.has(data[j][0]) == false){
      data[j][data[j].length] = 0;
    } else{
      data[j][data[j].length] = res.get(data[j][0]);
    }
  }
}

data.sort(cmp);

data = [head].concat(data);

output = table(data);
 
console.log(output);

var keys = require('./gapi.json');
const {google} = require('googleapis');


const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function lol(){build(client);})

async function build(cl){
  const gsapi = google.sheets({version: 'v4', auth: cl});
  var res = {values: data};
  const opt = {
    spreadsheetId: '1a-7R0VxElfa02nEJOhmELH8BWYY_xoo6vT-bboncFNA',
    range: 'Sheet1!A1',
    valueInputOption: 'USER_ENTERED',
    resource: res,
  }
  gsapi.spreadsheets.values.update(opt, (err, result) => {
    if (err) {
      // Handle error
      console.log(err);
    } else {
      console.log('%d cells updated.', result.data.updatedCells);
    }
  });
}