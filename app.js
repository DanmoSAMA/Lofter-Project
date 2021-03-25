//引入模块
const http = require('http');
const fs = require('fs');
const url = require('url');
const mongoose = require('mongoose');
const template = require('art-template');
// const { title } = require('process');

//操作数据库
mongoose.connect("mongodb://127.0.0.1/Lofter-Project");

mongoose.connection.once("open", function () {
  console.log("数据库连接成功");
});

const Schema = mongoose.Schema;
const dynSchema = new Schema({
  title: {
    type: String,
    default: "标题"
  },
  message: String
});
let DynModel = mongoose.model("dynamics", dynSchema);

let comments = [];

//读取数据库中的数据，并加入comments数组中
DynModel.find({},function (err, docs) {
  if(!err) {
    for(let i = docs.length - 1; i >= 0; i--){
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
      console.log(dynamic.title, dynamic.message);

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
    else {
      return res.end('404 Not Found.');
    }
  })
  .listen(3000, function () {
    console.log('服务器启动成功，可以通过 http://127.0.0.1:3000/ 来进行访问');
  })
