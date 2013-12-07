/**
 * Created with JetBrains WebStorm.
 * User: root
 * Date: 11/19/13
 * Time: 2:31 PM
 * To change this template use File | Settings | File Templates.
 */

var MongoClient = require('mongodb').MongoClient;

// Connect to the db
//MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
//    if(err) { return console.dir(err); }
//
//    var collection = db.collection('test');
//    var docs = [{k:1},{k:2},{k:3}];
//
//    collection.find({k:1},function(err,res){
//        console.log(res);
//    });

//    var stream = collection.find().stream();
//    stream.on('data',function(item){
//        console.log(item);
//    });
//    stram.on('end',function(item){
//
//    });



//    var stream = collection.find({k:{$ne:2}}).stream();
//    stream.on("data", function(item) {
//        console.log('data'+item);
//    });
//    stream.on("end", function() {
//        console.log('end');
//    });

    //collection.findOne({k:1}, function(err, item) {});

MongoClient.connect("mongodb://localhost:27017/microblog", function(err, db) {
    if(err) { return console.dir(err); }

    var collection = db.collection('users');

//    collection.findOne({'name':'lvpeng'},function(err,res){
//        console.log(res);
//    });
});
