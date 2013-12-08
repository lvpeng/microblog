/**
 * Created with JetBrains WebStorm.
 * User: root
 * Date: 12/8/13
 * Time: 9:16 AM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');


var Schema = mongoose.Schema;
// define a schema
var userSchema = new Schema({
    name:  String,
    password: String
});

// assign a function to the "methods" object of our userSchema
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
//userSchema.methods.findByUname = function (cb) {
//    return this.model('User').find({ name: this.name }, cb);
//}


var User = mongoose.model('User', userSchema);

module.exports = User;