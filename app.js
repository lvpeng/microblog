

var express = require('express');
var routes = require('./routes');
var settings = require('./settings');
var flash = require('connect-flash');
var partials = require('express-partials');


var app = express();
var MongoStore = require('connect-mongo')(express);


//Configuration
app.configure(function(){
        app.set('views',__dirname + '/views');
        app.set('view engine','ejs');
        app.use(partials());
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.static(__dirname + '/public'));
        app.use(express.cookieParser('keyboard cat'));
        //app.use(express.session({ key: 'sid', cookie: { maxAge: 60000 }}));
        app.use(express.session({
            serect: settings.cookieSecret,
            store : new MongoStore({
                db: settings.db
            })
        }));
        app.use(flash());
        app.use(app.router);
});
app.configure('development',function(){
    app.use(express.errorHandler({dumpExceptions:true,showStack:true}));
});

app.configure('production',function(){
    app.use(express.errorHandler());
});

//Routes
app.get('/',routes.index);
//app.get('/login',routes.chkNotLogin);
app.get('/login',routes.login);
app.post('/login',routes.doLogin);

app.get('/reg',routes.reg);
app.post('/reg',routes.doReg);


app.get('/post',routes.post);
app.post('/post',routes.doPost);

app.get('/u/:user',routes.user);
//app.get('/u/:username/bloglist',routes.bloglist);

app.get('/logout',routes.logout);



app.get('/hello',routes.hello);

var users = {
    'lvpeng':{
        'nickname':'ethanve',
        'age':25
    }
};

//app.all('/u/:userName',function(req,res,next){
//    if(req.params.userName){
//        next();
//    }else{
//        next(new Error(req.params.userName+'does not exists!'));
//    }
//});

//app.get('/login',routes.login);

//app.get('/u/:userName',function(req,res){
//    res.send('user:'+ req.params.userName);
//});
//app.get('/login',routes);
//app.get('/login',function(req,res){
//    res.sendfile('./login.html');
//});
//app.post('/login',function(req,res){
//    res.send(req.body.uName);
//});


//
//app.all('/user/:username',function(req,res,next){
//    if(users[req.params.username]){
//        next();
//    }else{
//        next(new Error(req.params.username +' does not exist'));
//    }
////    console.log('all methods captured');
////    next();
//});
//app.get('/user/:username',function(req,res){
//    res.send(JSON.stringify(users[req.params.username]));
//})
//app.put('/user/:username',function(req,res){
//    res.send('Done');
//})



app.listen(3000);
console.log("Express server listening on port 3000");