var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;

var dbUrl = 'mongodb://localhost:27017';

/* GET home page. */
router.get('/', function(req, res) {
    console.log(req.query)
    var data = {
        error:{}
    };
    mongoClient.connect(dbUrl, function(err, client) {
        if (err) {
            data.error.msg = "Error while creating db Connection";
            res.send(JSON.stringify(data));
        } else {
            var db = client.db('webShopping'); // connecting to specific database
            var collection = db.collection('userAccntDetails');// connecting to specific collection
            collection.find({uid:req.query.uid, upwd: req.query.upwd}).toArray(function(err, item){
                console.log(item)
                if (item.length == 1) { // length '0' indicates no records matching
                    data.msg = 'Valid'
                    req.session.isUserLoggedIn = true;
                } else {
                    data.msg = 'Invalid';
                    req.session.isUserLoggedIn = false;
                }
                res.send(JSON.stringify(data));
                client.close();
            });
             
        }
    });
});

module.exports = router;
