/**
 * Created with JetBrains WebStorm.
 * User: root
 * Date: 12/8/13
 * Time: 10:30 AM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('./db');

var Schema = mongoose.Schema;
// define a schema
var userSchema = new Schema({
    name:  String,
    password: String
});

//userSchema.methods.findSimilarTypes = function (cb) {
//    return this.model('Animal').find({ type: this.type }, cb);
//}
//
//userSchema.statics.findByName = function (name, cb) {
//    this.find({ name: name }, cb);
//}


var User = mongoose.model('User', userSchema);

module.exports = User;
