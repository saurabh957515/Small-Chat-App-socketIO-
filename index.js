var express = require("express");
var app = express();
var port = 8000;

// Set view of '/' end point
app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("View");
});

// use our public/chat.js file as a listener
app.use(express.static(__dirname + '/public'));

// Set port
var server = app.listen(port, function () {
    console.log('Node.js listening on port ' + port);
});

var io = require('socket.io')(server); // Corrected the initialization
// set up socket connection
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'Welcome to the Real Time Web Chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
