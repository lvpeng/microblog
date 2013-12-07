/**
 * Created with JetBrains WebStorm.
 * User: root
 * Date: 11/15/13
 * Time: 9:53 AM
 * To change this template use File | Settings | File Templates.
 */

// Retrieve
var MongoClient = require('mongodb').MongoClient;

function User(user){
    this.name = user.name;
    this.password = user.password;
}

User.prototype.save = function(user,callback){
    MongoClient.connect("mongodb://localhost:27017/microblog",function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('users',{w:1},function(err,collection){
            if(err){
                db.close();
                return callback(err);
            }
            collection.ensureIndex('name',{unique:true},function(err,indexName){
                //console.dir(indexName); //name_1
                if(err){
                    db.close();
                    return callback(err);
                }
                collection.insert(user,{w:1},function(err,result){
                    db.close();
                    callback(err,result);
                    console.log(result);
                });
            });
        });
    });
};


User.get = function(username,callback){
    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/microblog", function(err, db) {
        //        if(!err) {
//            console.log("We are connected");
//        }
        if(err){
            return callback(err);
        }
        db.collection('users',{w:1},function(err,collection){
            if(err){
                db.close();
                return callback(err);
            }
            //NOTE: 這裏不能添加 {w:1}選項，
            collection.findOne({'name':username},function(err,doc){
                db.close();
                if(doc){
                    var user = new User(doc);
                    callback(null,user)
                }else{
                    callback(err,null);
                }
            });
        });
    });

};

//MongoClient.connect("mongodb://localhost:27017/microblog", function(err, db) {
//    if(err) { return console.dir(err); }
//
//    var collection = db.collection('users');
//
//    collection.find({'name':'lvpeng'},function(err,res){
//        console.log(res);
//    });
//});

module.exports = User;