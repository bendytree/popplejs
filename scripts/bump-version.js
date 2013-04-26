var fs = require('fs');

//bump the version
var package = require('../package.json');
var v = package.version;
var i = v.lastIndexOf('.');
package.version = v.substring(0, i) + '.' + (parseInt(v.substring(i+1))+1);
console.log();
console.log('new version: '+package.version);
var json = JSON.stringify(package, null, 2);
fs.writeFile("./package.json", json, function(err) {
    if(err) console.log(err);
}); 
