const http = require('http');
const fs = require('fs');
const url = require('url');
http
    .createServer(function (req, res) {
        let parseObj = url.parse(req.url, true);
        let pathname = parseObj.pathname;
        if(pathname === '/') {
            fs.readFile('./public/index.html', function (err, data) {
                if(err) {
                    return res.end('404 Not Found.')
                }
                res.end(data.toString());
            });
        }
    })
    .listen(3000, function () {
        console.log('服务器启动成功，可以通过 http://127.0.0.1:3000/ 来进行访问');
    })