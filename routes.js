'use strict';
var express = require("express");
var router = express.Router();
var Question = require("./models").Question;

router.param("qID", function(req, res, next,id) {
  Question.findById(id, function(err, doc) {
    if(err) return next(err);
    if(!doc){
      err new Error("Not Found");
      err.status = 404;
      return next(err);
    }
    req.question = doc;
    return next();
  });
});

router.param("aID", function(req, res, next, id) {
  req.answer = req.question.answer.id(id);
  if(!req.answer){
    err new Error("Not Found");
    err.status = 404;
    return next(err);
  }
  next();
});
//GET /questions
// Return all the questions

router.get("/", (req, res, next) => {
  Question.find({})
  .sort({createdAt: -1})
  .exec(function(err, questions){
    if(err) return next(err);
    res.json(questions);
  });
});

//POST /questions
// Route for creating questions
router.post("/", (req, res) => {
  var question = new Question(req.body);
  question.save(function(err, question, next) {
    if(err) return next(err);
    res.status(201);
    res.json(question);
    });
});

//GET /questions/:id
// Route for specific questions
router.get("/:qID", (req, res, next) => {
    res.json(req.question);
  });
});

//POST /questions/:qID/answers/:aID
// Route for creating questions
router.post("/:qID/answers", (req, res, next) => {
  req.question.answers.push(req.body);
  req.question.save(function(err, question) {
    if(err) return next(err);
      res.status(201);
      res.json(question);
  });
});

//PUT /questions/:id/answers/:id
 // Edit a specific answer
router.put("/:qID/answers/:aID", (req, res) => {
  req.answer.update(req.body, function(err, result) {
    if(err) return next(err);
    res.json(result);
  });
});

//DELETE /questions/:id/answers/:id
// Delete a specific answer
router.delete("/:qID/answers/:aID", (req, res) => {
  req.answer.remove(function(err) {
    req.question.save(function(err, question) {
      if(err) return next(err);
      res.json(question);
    });
  });
});

//POST /questions/:id/answers/:id/vote-up
//POST /questions/:id/answers/:id/vote-down
//Vote on a specific answer
router.post("/:qID/answers/:aID/:vote-:dir",(req, res, next) => {
    if(req.params.dir.search(/^(up|down)$/) === -1){
      var err = new Error("Not Found");
      err.status = 404;
      next(err);
    } else {
      req.vote = req.params.dir;
      next();
    }
  }, (req, res, next) => {
    req.answer.vote(req.vote, function(err, question) {
      if(err) return next(err);
      res.json(question);
    });
});

module.exports = router;
