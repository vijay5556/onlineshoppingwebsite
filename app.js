var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require("express-session");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginValidationRouter = require('./routes/loginValidation'); // Creating reference fo existing webservice js file
var getProduct = require("./routes/getProductDetails");
var addUser = require("./routes/addNewUser");
var isuserlogin = require("./routes/isUserLoggedIn");
var logoutUser = require("./routes/logoutUser");
var empDetails = require("./routes/empDetails");
var uploadImg = require("./routes/uploadingImage")
var app = express();
var http = require("http");

var server = http.Server(app);


const io = require('socket.io')(server);



app.use(session({ secret: 'kjhkjhk', cookie: { maxAge: 1000000 }}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

console.log(__dirname)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user/logindata/validation', loginValidationRouter); // Specifying unique url identity for webservice.
app.use('/get/data/products', getProduct);
app.use('/register/newUser', addUser);
app.use('/isuserlogin', isuserlogin);
app.use('/logoutuser', logoutUser);
app.use("/show/EmployeeDetails", empDetails);
app.use("/data/upload/productImage", uploadImg);
server.listen(8081, () => {
	console.log("Server is listing at 8081")
});
var count = 0;

io.on('connection', (socket) => {
  count++;
  console.log("Total no. of users connected " + count);
    socket.on("send_msg", (data) => {  
        var msg = data;
        socket.broadcast.emit('receive_Msg', msg);
    });
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
