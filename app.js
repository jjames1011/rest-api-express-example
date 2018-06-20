'use strict';
var express = require('express');
var app = express();
var routes = require("./routes.js");
var jsonParser = require("body-parser").json;
var logger = require("morgan");

app.use(logger('dev'));
app.use(jsonParser());

//only direct routes that start with /questions through our routes.js file
app.use("/questions", routes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});




var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Express server is listening on port', port);
});
