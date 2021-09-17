var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var dbUrl = 'mongodb://localhost:27017';

/* GET home page. */
router.post('/', function(req, res, next) {
    var data = {status:'Error'}
    mongoClient.connect(dbUrl, (err, client) => {
        if (err) {
            
            data.msg = "Error while connecting to Database"
        } else {
            var db = client.db("webShopping");
            var collection = db.collection("userAccntDetails");
            collection.find({uid:req.body.uid}).toArray((err, items) => {
                if (items.length != 0) {       
                    //res.writeHead(500);        
                    data.msg = "User with same id already existed";
                    client.close();
                    res.send(JSON.stringify(data));
                } else { //inser data to db
                    // inserMany([ { ...}, {...}])

                    collection.insertOne(req.body, (err) => {
                        if (!err) {
                            data.status = 'Success';
                            data.msg = "Successfly user got registered";
                        } else {
                            data.msg = "Error while inserting data"
                        }
                        client.close();
                        res.send(JSON.stringify(data));
                    });
                }
            });
        }
    });    
});



module.exports = router;
