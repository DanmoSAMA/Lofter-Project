const http = require('http');
const fs = require('fs');
const url = require('url');
let template = require('art-template');
let comments = [];
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
    else if(pathname === '/dynamic'){
      let dynamic = parseObj.query;
      comments.unshift(dynamic);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    }
    else {
      return res.end('404 Not Found.');
    }
  })
  .listen(3000, function () {
    console.log('服务器启动成功，可以通过 http://127.0.0.1:3000/ 来进行访问');
  })