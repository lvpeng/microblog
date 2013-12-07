var MongoClient =require('mongodb').MongoClient;

function Blog(blog){
    this.title = blog.title;
    this.username = blog.username;
    this.content = blog.content;
    if(blog.time){
        this.time = blog.time;
    }else{
        this.time = new Date();
    }
}

Blog.prototype.save = function(blog,callback){
    MongoClient.connect("mongodb://localhost:27017/microblog",function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('blogs',{w:1},function(err,col){
            if(err){
                db.close();
                return callback(err);
            }
            col.ensureIndex("username",{w:1},function(err,indexname){
                if(err){
                    db.close();
                    return callback(err);
                }
                //console.dir(indexname);  //username_1
                col.insert(blog,function(err,blog){
                    db.close();
                    callback(err,blog);
                });
            });
        });
    });
};


Blog.get = function(username,callback){
    MongoClient.connect("mongodb://localhost:27017/microblog",function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('blogs',{w:1},function(err,col){
            if(err){
                db.close();
                return callback(err);
            }
            var query = {};
            if(username){
                query.username = username;
            }
            col.find(query).sort({'time':-1}).toArray(function(err,docs){
                db.close();
                if(err){
                    return callback(err,null);
                }
                //封裝blogs 爲 Blog 對象
                var blogs = [];
                if(docs.length >0){
                    for(var i = 0;i<docs.length;i++){
                        var doc = docs[i];
                        var blog = new Blog(doc);
                        blogs.push(blog);
                    }
                }
//                var blogs = [];
//                if(docs.length>0){
//                    docs.each(function(err,doc){
//                    var blog = new Blog(doc);
//                    blogs.push(blog);
//                });
//            }
                callback(null,blogs);
            });
        });
    });
}


Blog.prototype.get = function(username,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('blogs',{strict:true},function(err,col){
            if(err){
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if(username){
                query.user = username;
            }
            col.find(query.sort({time:-1}).toArry(function(err,docs){
                mongodb.close();
                if(err){
                    callback(err,null);
                }
                var blogs = [];
                docs.foreach(function(doc,index){
                    var blog = new Blog(doc);
                    blogs.push(blog);
                });
                callback(err,blog);
            }));
        });
    });
};

module.exports = Blog;
