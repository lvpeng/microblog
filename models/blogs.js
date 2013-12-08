/**
 * Created with JetBrains WebStorm.
 * User: root
 * Date: 12/8/13
 * Time: 12:46 AM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('./db');


var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title:  String,
    username: String,
    content:   String,
    time: { type: Date, default: Date.now }
});

var Blog = mongoose.model('Blog', blogSchema);


module.exports = Blog;
