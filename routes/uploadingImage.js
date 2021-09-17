var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

console.log("5st");

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/uploads/');
    },
   
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, callback) { 
        file_path = "userImage" + '-' + Date.now() + path.extname(file.originalname);
        callback(null, file_path);
    }
});
var upload = multer({ storage: storage}).single('prodImage');
var file_path;
console.log("2st");

/* GET home page. */
router.post('/', function(req, res, next) {
    var data = {};
    upload(req, res, function(err) {
        if (err) {
            data.msg = "ERROR"
            console.log(err);
        } else {
            data.file_path = file_path;
            data.msg = 'success';
        }
        res.send(JSON.stringify(data));
    });
});

module.exports = router;
