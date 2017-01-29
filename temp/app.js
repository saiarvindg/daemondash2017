var express = require('express')
var server = express()
var bodyParser = require('body-parser')
var myFunc = require('./test.js');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: "Hello" });
});

router.route('/classes')
    .get(function(req, res) {
        var x = myFunc();
        res.json({message: x});
        //res.json(myFunc());
    });

server.use('/api', router);

server.listen(3000, function() {
    console.log("server started on port 3000");
});