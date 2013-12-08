/**
 * Created with JetBrains WebStorm.
 * User: root
 * Date: 11/14/13
 * Time: 4:00 PM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/microblog');

module.exports = mongoose;

//var settings = require('../settings'),
//    Db = require('mongodb').Db,
//    MongoClient = require('mongodb').MongoClient,
//    Server = require('mongodb').Server,
//    Connection = require('mongodb').Connection;
//
////module.exports = new Db('microblog', new Server('localhost', 27017));
//module.exprots = new Db(settings.db, new Server(settings.host,Connection.DEFAULT_PORT));





