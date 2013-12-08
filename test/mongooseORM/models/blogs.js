/**
 * Created with JetBrains WebStorm.
 * User: root
 * Date: 12/8/13
 * Time: 12:30 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    password:String
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()

// 會建立一個集合名爲 affsdfs 的 collection
var User = mongoose.model('affsdf', userSchema);

var p1 = new User({ name: 'tom' })
//console.log(p1.name) // 'tom'
p1.save(function(err,u){
    //console.log()
});

//var fluffy = new Kitten({ name: 'fluffy' });
//fluffy.speak() // "Meow name is fluffy"
//
//
//fluffy.save(function (err, fluffy) {
//    if (err) // TODO handle the error
//        fluffy.speak();
//});
//
//
//Kitten.find(function (err, kittens) {
//    if (err){
//        // TODO handle err
//    }
//    console.log(kittens);
//})
//
//
//Kitten.find({ name: /^Fluff/ }, function(err,doc){
//    if(err){
//        return ;
//    }
//    console.log(doc);
//})



////Defining your schemas
////Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
//var blogSchema = new Schema({
//    title:  String,
//    author: String,
//    body:   String,
//    comments: [{ body: String, date: Date }],
//    date: { type: Date, default: Date.now },
//    hidden: Boolean,
//    meta: {
//        votes: Number,
//        favs:  Number
//    }
//});
//
//
//var Blog = mongoose.model('Blog', blogSchema);
//var blog = new Blog({title:'2013/12/08',author:"lvpeng",body:'又霧霾了!',comments:[{body:"是阿，全國霧霾!"}]});



