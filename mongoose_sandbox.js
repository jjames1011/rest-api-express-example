"use strict";

var mongoose = require("mongoose");

//connect to the database
mongoose.connect("mongodb://localhost:27017/sandbox");

//create database variable for moethods
var db = mongoose.connection;

//database error handler:
db.on("error",(err) => {
  console.error("connection error:", err);
});

//open the connection
db.once("open", () => {
  console.log("db connection successful");
  // All database communication goes here

  //define the schema
  var Schema = mongoose.Schema;
  var AnimalSchema = new Schema({
    type: {type: String, default: "goldfish"},
    size: {type: String, default: "small"},
    color: {type: String, default: "golden"},
    mass: {type: Number, default: 0.007},
    name: {type: String, default: "Angela"}
  });

  var Animal = mongoose.model("Animal", AnimalSchema);

  var elephant = new Animal({
    type: "elephant",
    size: "big",
    color: "gray",
    mass: 6000,
    name: "Lawrence"
  });
  var animal = new Animal({}); //Goldfish

  var whale = new Animal({
    type: "whale",
    size: "big",
    mass: 190500,
    name: "Fig"
  });

  Animal.remove({}, (err) => {
    if(err) console.error(err);
    elephant.save((err) => {
      if(err) console.error(err);
      animal.save((err) => {
        if(err) console.error(err);
        whale.save((err) => {
          if(err) console.error(err);
          Animal.find({size: "big"},(err, animals) => {
            animals.forEach((animal) => {
              console.log(animal.name + " the " + animal.color + " " + animal.type);

            });

          db.close(() => {
            console.log("db connection closed");
            });
          });
        });
      });
    });
  });
});
