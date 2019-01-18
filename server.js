
// require() is a built-in function in node.js, it loads modules.
var express = require('express');
var app = express();       
// express() is a top level fucnction in express module that creates an express application.
// the app returned by express() is a JavaScript Function, designed to be passed to Node’s HTTP servers as a callback to handle requests. 

// set up ejs as the view engine.
app.set('view engine', 'ejs');     

// use asset folder to store assets.     
// static() is a built-in middleware function in express to serve static assets.
// use() mounts the middleware function at the specified path.
// this will be used when route matches the path, if its mounted without a path
// the middleware will be used for every request to app.
app.use(express.static(__dirname + '/assets'));      

// route for app (sets route for homepage)
// get() routes http get request to the specified path with the specified the callback functions.
app.get('/', function(req, res) {
    res.render('pad');
});
// req is request and res is response, they are built-in objects from express
// res.render() renders a view and sends the rendered HTML string to the client
// here we render pad.ejs as our homepage.

// homepage/id url will also render page. 
// so this gives support for multiple files
app.get('/(:id)', function(req, res) {
    res.render('pad');
});

// load sharejs and redis
// sharejs is a library for collaborativ editing
var sharejs = require('share');     // sharejs is now sharedb. replace?
require('redis');

// get options for sharejs
var options = {
    db : {type : 'redis'}   // forcing sharejs to use redis data store
};

// attach express server to sharejs
sharejs.server.attach(app, options);

// listen on port 8000 of localhost
var port = 8000;
app.listen(port);
// listen() binds and listens for connections on the specified host and port

