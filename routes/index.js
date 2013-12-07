/*
 * GET home page.
 */
var crypto = require('crypto');
var User = require('../models/user.js');
var Blog = require('../models/blog.js');

exports.index = function(req, res){
    res.render("index",{'title':"Express","success":req.flash('succ'),'error':req.flash('err')});
};

//exports.user = function(req,res){
//
//};

exports.user = function(req,res){
    //res.render("userIndex",{'title':"個人首頁","success":req.flash('succ'),'error':req.flash('err')});

    User.get(req.params.user, function(err,user){
        if(!user){
            req.flash('err', '用戶不存在');
            return res.redirect('/');
        }
        //get url中 user.name = username 的 所有 blogs
        Blog.get(user.name, function(err,blogs){
            if (err) {
                req.flash('err', err);
                return res.redirect('/');
            }
//             for(var i =0 ;i<blogs.length;i++){
//                 console.log(blogs[i]);
//             }
            res.render('blogs', {
                title: user.name,
                blogs: blogs,
                success:req.flash('succ'),
                error:req.flash('err')
            });

        });
    });
//    var htmlStr = "<html><body><table><tr><td>Title:</td><td>Content:</td></tr>";
//    for(var i =0; i< blogs.length; i++){
//        htmlStr += "<tr><td>" +  blogs[i].title +"</td><td>" + blogs[i].content + "</td></tr>";
//    }
//    htmlStr += "</table></body></html>";
//    res.send(htmlStr);



};

exports.post = function(req,res){
    res.render("post",{'title':"寫博客","success":req.flash('succ'),'error':req.flash('err')});
};
exports.doPost = function(req,res){
    var currentUserName = req.session.user.name;
    var title = req.body.title;
    var content = req.body.content;

//    console.dir(currentUserName);
//    console.dir(title);
//    console.dir(content);

    //NOTE:  instance a Blog Object , to pass to the Blog.save()
    var newBlog = {
        username: currentUserName,
        title:title,
        content: content,
        time: new Date()
    };
    //This is a error i first write:  var blog = new Blog(currentUserName,title,content);
    var blog = new Blog(newBlog);

    //console.dir(blog);
    blog.save(blog,function(err){
        if(err){
           req.flash('err',err.message);
           res.redirect('/');
        }
        req.flash('succ','發表成功');
        res.redirect('/u/'+ currentUserName);
    });
};

exports.reg = function(req,res){
    res.render('reg',{"title":"用戶註冊","success":req.flash('succ'),"error":req.flash('err')});
};

exports.doReg = function(req,res){
    //檢驗兩次輸入的密碼是否一致
    if(req.body['password-repeat'] != req.body['password']){
        req.flash('err','兩次輸入的口令不一致');
        return res.redirect('/reg');
    }
    //對密碼進行md5加密
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body['password']).digest('base64');
    //NOTE:  instance a User Object , to pass to the User.save()
    var newUser = new User({
        name:req.body['username'],
        password:password
    });

    //檢驗用戶是否已存在
    User.get(newUser.name,function(user){
        //如果存在,錯誤提示“用戶已經存在”，跳轉到登錄頁面
        if(user){
            req.flash('err','當前用戶已經存在，請直接登錄！');
            return res.redirect('/login');
        }
        //如果不存在,將記錄 User.save 存入
        else{
            //console.log(newUser);
            newUser.save(newUser,function(err){
                if(err){
                    req.flash('err',err);
                    return res.redirect('/reg');
                }
                //將newUser 保存到session中
                req.session.user = newUser;
                req.flash('succ','註冊成功');
                res.redirect('/');
            });
        }

    });
};
exports.chkNotLogin = function(req,res,next){
    if(req.session.user){
        return res.redirect('/');
    }
    next();
};
exports.login = function(req,res){
    res.render('login.ejs',{'title': '用戶登入',"success":req.flash('succ'),'error':req.flash('err')});
};

exports.doLogin = function(req,res){
    //對密碼進行加密，以便和數據庫進行校驗一致
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body['password']).digest('base64');

    var user = new User({
        name:req.body['username'],
        password: password
    });
    //驗證用戶是否存在
    User.get(user.name,function(err,result){
        //console.log(user.name);
        if(!result){
            req.flash('err','用戶不存在!');
            return res.redirect('/reg');
        }
        if(result.password != user.password){
            req.flash('err','用戶名或者密碼輸入錯誤，請重新輸入！');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('succ','登錄成功！');
        res.redirect('/');

    });


};

exports.logout = function(req,res){
    // 註銷用戶 取消會話
    req.session.user = null;
    req.flash('succ','登出成功');
    res.redirect('/')
};

exports.hello = function(req,res){
    //res.render('sayHello',{curr_time:new Date().toString()} );
    res.send('The time is:' + new Date().toString());
}

