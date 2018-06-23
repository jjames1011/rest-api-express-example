'use strict';
var express = require('express');
var app = express();
var routes = require("./routes.js");
var jsonParser = require("body-parser").json;
var logger = require("morgan");

app.use(logger('dev'));
app.use(jsonParser());

var mongoose = require("mongoose");

//connect to the database
mongoose.connect("mongodb://localhost:27017/qa");

//create database variable for moethods
var db = mongoose.connection;

//database error handler:
db.on("error",(err) => {
  console.error("connection error:", err);
});

//open the connection
db.once("open", () => {
  console.log("db connection successful");
});
//allows access to browsers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if(req.method  === "OPTIONS"){
    res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
    return res.status(200).json({});
  }
  next();
});
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
