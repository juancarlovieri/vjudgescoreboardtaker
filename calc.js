var lat = require('./latihan/process.js'); 

var arr = require('./dir.json').dir;
var temp = {
  "id": []
}
for(var i = 0; i < arr.length; ++i){
  if(arr[i] == './repeating/')continue;
  var arr2 = require(arr[i] + 'id.json').id;
  for(var j = 0; j < arr2.length; ++j){
    temp.id[temp.id.length] = arr2[j];
  }
}
var fs = require('fs');
console.log(temp);
var jsonContent = JSON.stringify(temp);
fs.writeFileSync("./repeating/id.json", jsonContent, "utf8", function(err) {
  if (err) {
    console.log("An errr occured while writing JSON jsonObj to File.");
    return console.log(err);
  }
  console.log("saved");
});
console.log("TES");
var rep = require('./repeating/process.js'); 