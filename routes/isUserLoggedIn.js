var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    var data = {};
    if (req.session && req.session.isUserLoggedIn) {
        data.status = req.session.isUserLoggedIn
    } else {
        data.status = false;
    }
    data = JSON.stringify(data);
    res.send(data);
});

module.exports = router;
