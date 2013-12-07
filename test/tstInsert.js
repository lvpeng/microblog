/**
 * Created with JetBrains WebStorm.
 * User: root
 * Date: 11/19/13
 * Time: 9:13 AM
 * To change this template use File | Settings | File Templates.
 */

var MongoCient = require('mongodb').MongoClient
    ,assert = require('assert');

MongoCient.connect("mongodb://localhost:27017/test",function(err,db){
    if(err){
        return console.dir(err);
    }
    var doc1 = {'name':'doc1'};
    var doc2 = {'name':'doc2'};
    var doc3 = {'name':'doc3'};
    var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];

    //Insert_1 --  result return the insert item
//    var collection = db.collection('test');
//    collection.insert(doc3,{w:1},function(err,result){
//        if(err){
//            return console.dir(err);
//        }
//        console.dir(result);
//    });

    //Insert_2   (recommend)
//    db.collection('test',{w:1},function(err,collection){
//        if(err){
//            console.dir(err);
//        }
//        collection.insert(lotsOfDocs,function(err,result){
//            db.close();
//            if(err){
//                console.dir(err);
//            }
//            console.dir(result);
//        })
//    });

    //Update -- return the num of update item
    //{$set:{}}, {w:1,multi:true}

    var collection = db.collection('test');
    var doc = {a:1,b:1};

    db.collection('test',{w:1},function(err,collection){
        if(err){
            console.dir(err);
        }
        collection.insert(doc,{w:1},function(err,doc){
            if(err){
                console.dir(err);
            }
            collection.update({a:1},{$set:{b:33}},{w:1,multi:true},function(err,result){
                if(err){
                    console.dir(err);
                }
                var doc2 = {mykey:2,docs:[{doc1:1}]};
                collection.insert(doc2,{w:1},function(err,result){
                    collection.update({mykey:2},{$push:{docs:{doc2:1}}},{w:1},function(err,result){
                        console.dir(result);
                    });
                });
                //console.dir(result);
//                setTimeout(function(){
//                    collection.findOne({a:1},function(err,item){
//                        console.dir(item.b);
//                        db.close();
//                    });
//                },1000);
            });

            //console.dir(result);
//            setTimeout(function(){
//                collection.findOne({a:1})
//            },1000)
            //assert.equal(null, err);
            //assert.equal(3, result);
        });
    });




        // Remove --   result -- return the number of delete docs
//      collection.remove({"name":"doc2"},function(err,result){
//          if(err){
//            return console.dir(err);
//        }
//        console.dir(result);
//      });


});
