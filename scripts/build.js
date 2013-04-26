
var uglifycss = require('uglifycss');
var uglifyjs = require('uglify-js');
var scriptsmash = require('stringsmash');
var fs = require('fs');
var zlib = require('zlib');
var async = require('async');


var css;
var js;
var minjs;

async.series([
    function(callback){
        //load original css
        console.log();
        console.log('compressing css...');
        css = fs.readFileSync('./src/prebuild-popple.css', "utf8");        
        zlib.deflate(css, function(err, buffer) {
            console.log('css: '+css.length+' (gzip: '+buffer.toString('base64').length+')');
            callback(null, css);
        });
    },
    function(callback){
        //minify css
        css = uglifycss.processString(css);      
        zlib.deflate(css, function(err, buffer) {
            console.log('min: '+css.length+' (gzip: '+buffer.toString('base64').length+')');
            callback();
        });
    },
    function(callback){
        //stringsmash the css
        css = scriptsmash(css);
        zlib.deflate(css, function(err, buffer) {
            console.log('sms: '+css.length+' (gzip: '+buffer.toString('base64').length+')');
            callback();
        });
    },
    function(callback){
        //load js
        console.log();
        console.log('compressing js...');
        js = fs.readFileSync('./src/prebuild-popple.js', "utf8");        
        zlib.deflate(js, function(err, buffer) {
            console.log(' js: '+js.length+' (gzip: '+buffer.toString('base64').length+')');
            callback();
        });
    },
    function(callback){
        //inject css
        js = js.replace('"BUILD-PUTS-CSS-HERE"', css);
        zlib.deflate(js, function(err, buffer) {
            console.log('bth: '+js.length+' (gzip: '+buffer.toString('base64').length+')');
            callback();
        });
    },
    function(callback){
        //minify js
        minjs = uglifyjs.minify(js, {fromString:true}).code;
        zlib.deflate(minjs, function(err, buffer) {
            console.log('min: '+minjs.length+' (gzip: '+buffer.toString('base64').length+')');
            callback();
        });
    },
    function(callback){
        //save the raw js in the libs folder
        fs.writeFile("./lib/popple.js", js, function(err) {
            if(err) console.log(err);
            callback();
        }); 
    },
    function(callback){
        //save the compressed js in the libs folder
        fs.writeFile("./lib/popple.min.js", minjs, function(err) {
            if(err) console.log(err);
            callback();
        }); 
    },
    function(callback){
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
            callback();
        }); 
    },
    function(callback){
        console.log();
    }
]);

