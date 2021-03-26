//引入模块
const http = require('http');
const fs = require('fs');
const url = require('url');
const mongoose = require('mongoose');
const template = require('art-template');

//操作数据库
mongoose.connect("mongodb://127.0.0.1/Lofter-Project");

mongoose.connection.once("open", function () {
  console.log("数据库连接成功");
});

//发动态
const Schema = mongoose.Schema;
const dynSchema = new Schema({
  title: {
    type: String,
    default: "标题"
  },
  message: String
});
const DynModel = mongoose.model("dynamics", dynSchema);

let comments = [];

//登录信息
const LgSchema = new Schema({
  id: String,
  password: String
});
const LgModel = mongoose.model("loginInfo", LgSchema);

//读取数据库中的数据，并加入comments数组中
DynModel.find({}, function (err, docs) {
  if (!err) {
    for (let i = docs.length - 1; i >= 0; i--) {
      comments.push(docs[i]);
    }
  }
});

//操作服务器
http
  .createServer(function (req, res) {
    let parseObj = url.parse(req.url, true);
    let pathname = parseObj.pathname;
    if (pathname === '/') {
      fs.readFile('./views/index.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        let htmlStr = template.render(data.toString(), {
          comments: comments
        })
        res.end(htmlStr);
      });
    }
    else if (pathname === '/found') {
      fs.readFile('./views/found.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      });
    }
    else if (pathname === '/user_1') {
      fs.readFile('./views/user_1.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data);
      });
    }
    else if (pathname === '/user_2') {
      fs.readFile('./views/user_2.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data);
      });
    }
    else if (pathname === '/user1_artical1') {
      fs.readFile('./views/user1_artical1.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data);
      });
    }
    else if (pathname === '/user1_artical2') {
      fs.readFile('./views/user1_artical2.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data);
      });
    }
    else if (pathname.indexOf('/public/') === 0) {
      fs.readFile('.' + pathname, function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }
    else if (pathname === '/dynamic') {
      let dynamic = parseObj.query;
      comments.unshift(dynamic);

      DynModel.create({
        title: dynamic.title,
        message: dynamic.message
        //必须传在Schema中规定的属性
      }, function (err) {
        if (!err) {
          console.log(`插入成功，title是"${dynamic.title}",message是"${dynamic.message}"`);
        }
      })

      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    }
    else if (pathname === '/login') {
      fs.readFile('./views/login.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data);
      });
    }
    else if (pathname === '/_login') {
      //登录的思路：第一次登录即为注册，将id和password保存在数据库中
      //下次登录的时候通过数据库里的id来检查密码，如果密码正确，才会登录成功，跳转页面
      let _login = parseObj.query;

      /*
        if (LgModel.findOne({ id: _login.id }, function () { 
          console.log(LgModel.findOne({ id: _login.id }, function () { })._conditions.id);
        })._conditions.id === _login.id) {
          console.log('已存在该用户和密码');
        } else {
          console.log('新用户');
          LgModel.create({
            id: _login.id,
            password: _login.password
          }, function (err) {
            if (!err) {
              console.log(`插入成功，id是"${_login.id}",password是"${_login.password}"`);
            }
          })
        }

        LgModel.create({
          id: _login.id,
          password: _login.password
        }, function (err) {
          if (!err) {
            console.log(`插入成功，id是"${_login.id}",password是"${_login.password}"`);
          }
        })
      */

      LgModel.findOne({ id: _login.id },
        function (err, data) {
          if (!err) {
            if (data !== null) {
            //如果找到这个id，判断密码是否正确，正确则跳转到主页
              if (data.password !== _login.password) {
                console.log('密码错误');
              }
              else {
                console.log('登录成功');
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
              }
            }
            else {
              //如果集合里有文档，就不插入，否则就插入(上边的方式不成功)
              //下边这个方法能成功，不过似乎不需要这样用了，会报错 cannot read property 'password' of null

              /*
                LgModel.updateOne({
                  id: _login.id,
                  password: _login.password
                }, {
                  id: _login.id,
                  password: _login.password
                }, {
                  upsert: true
                }, function (err) {
                  if (!err) {
                    console.log(`插入成功，id是"${_login.id}",password是"${_login.password}"`);
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    res.end();
                  }
                });
              */
             
              LgModel.create({
                id: _login.id,
                password: _login.password
              }, function (err, data) {
                console.log(`插入成功，id是"${_login.id}",password是"${_login.password}"`);
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
              });
            }
          }
        })
    }
    else {
      return res.end('404 Not Found.');
    }
  })
  .listen(3000, function () {
    console.log('服务器启动成功，可以通过 http://127.0.0.1:3000/ 来进行访问');
  })
