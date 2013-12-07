/**
 * Created with JetBrains WebStorm.
 * User: root
 * Date: 11/19/13
 * Time: 2:09 PM
 * To change this template use File | Settings | File Templates.
 */

var MongoClient = require('mongodb').MongoClient;


// Connect to the db
MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
    if(err) { return console.dir(err); }

    var collection = db.collection('test');
    var docs = [{mykey:1}, {mykey:2}, {mykey:3}];

    collection.remove(function(err,result){
        if(err){
            console.dir(err);
        }
        console.dir(result);
    });
});