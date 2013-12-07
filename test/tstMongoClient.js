/**
 * Created with JetBrains WebStorm.
 * User: root
 * Date: 11/18/13
 * Time: 7:26 PM
 * To change this template use File | Settings | File Templates.
 */


//NOTE: 之前一直報錯，MongoClient 爲 undefined , 沒有方法 MongoClient
// 最後 npm uninstall mongodb , 升級版本(1.3.19)OK ， 之前版本是0.9.9

// Retrieve
var MongoClient = require('mongodb').MongoClient;
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
    if(!err) {
        console.log("We are connected");
    }
});
