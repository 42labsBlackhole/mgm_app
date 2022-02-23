const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
var port = 8080;
const app = express()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', serveStatic(path.join(__dirname, '/dist')))
app.use('*', serveStatic(path.join(__dirname, '/dist')))

app.listen(port,"0.0.0.0",function(){ console.log('Server started on port: ' + port); });