var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var name = "Prasad"
    var empDetailsData = {
        name: 'Raj',
        age: 20,
        department: 'Finance',
        addr: {
            loc: 'Hyderabad, India'
        }
    };
    empDetailsData = JSON.stringify(empDetailsData);
     res.send(empDetailsData);
    //res.render('empDetails', empDetailsData);
});

module.exports = router;
