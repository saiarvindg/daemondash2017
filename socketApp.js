var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var myFunc = require('./test.js');

var port = process.env.port || 3000;
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', function(socket) {
	// Send a chat message to everyone in the specified room
	socket.on('the data', function(dataInfo) {
        console.log(dataInfo)
        processData(dataInfo.p1, dataInfo.p2);
	});

    function processData(p1, p2) {
        var s1 = p1;
        var s2 = p2;

       myFunc(s1, s2, giveData);
    };

    function giveData(stuff) {
        console.log("made it")
        socket.emit('give data', {data: stuff});
    };
});

server.listen(port, function() {
	console.log("Server started on port " + port);
});