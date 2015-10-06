var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('data.json', function(error, dataBuffer){
    var data = JSON.parse(dataBuffer);
    res.send(data);
  });
});

module.exports = router;
