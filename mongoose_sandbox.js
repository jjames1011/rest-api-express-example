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
    size: String,
    color: {type: String, default: "golden"},
    mass: {type: Number, default: 0.007},
    name: {type: String, default: "Angela"}
  });

  //middleware before the data is saved
  AnimalSchema.pre("save", function(next) {
    if(this.mass>=100){
      this.size = "big";
    }else if(this.mass >= 5 && this.mass < 100){
      this.size = "medium";
    }else {
      this.size = "small";
    }
    next();
  });

//define static methods
  AnimalSchema.statics.findSize = function(size, callback) {
    //this == Animal
    return this.find({size: size}, callback);
  }


  AnimalSchema.methods.findSameColor = function (callback) {
    //this == document
    return this.model("Animal").find({color: this.color}, callback);
  }

  var Animal = mongoose.model("Animal", AnimalSchema);

  var elephant = new Animal({
    type: "elephant",
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
   var animalData = [
     {
       type: 'mouse',
       color: 'grey',
       mass: 0.035,
       name: 'Marvin'
     },
     {
       type: 'nutria',
       color: 'brown',
       mass: 6.35,
       name: "Gretchen"
     },
     {
       type: 'wolf',
       color: 'gray',
       mass: 45,
       name: "Iris"
     },
     elephant,
     animal,
     whale
   ];
  Animal.remove({}, (err) => {
    if(err) console.error(err);
      Animal.create(animalData, (err, animals) => {
        if(err) console.error(err);
        Animal.findOne({type: "elephant"}, (err, elephant) => {
          elephant.findSameColor(function (err, animals) {
            if(err) console.error(err);
            animals.forEach((animal) => {
              console.log(animal.name + " the " + animal.color + " " + animal.type + " is a " + animal.size + "-sized animal.");
              });

            db.close(() => {
              console.log("db connection closed");
            });
          });
      });
    });
  });
});
