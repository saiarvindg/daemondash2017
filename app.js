var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var getData = require('./services.js');

var port = process.env.port || 3000;
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', function(socket) {
	// Send a chat message to everyone in the specified room
	socket.on('get data', function(dataInfo) {
        console.log("I got: ");
        console.log(dataInfo.s1);
        console.log(dataInfo.s2);
        processData(dataInfo.s1, dataInfo.s2);
	});

    function processData(s1, s2) {
        console.log("Gathering data... ")
        getData(s1, s2, giveData);
    };

    function giveData(processedData, absMax) {
        console.log("made it")
        socket.emit('give data', {data: processedData, max: absMax});
    };
});

server.listen(port, function() {
	console.log("Server started on port " + port);
});