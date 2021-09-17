var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;

var dbUrl = 'mongodb://localhost:27017';

/* GET home page. */
router.get('/', function(req, res, next) {
  	mongoClient.connect(dbUrl, (err, client) => {
		var db = client.db("webShopping");
		var collection = db.collection('productDetails');
		collection.find({}).toArray((err, items) => {
			data = items;
			client.close();
			res.send(JSON.stringify(data));
		})
	})
});

module.exports = router;
