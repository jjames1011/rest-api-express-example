'use strict';
var express = require("express");
var router = express.Router();

//GET /questions
// Return all the questions

router.get("/", (req, res) => {
  res.json({response: "You sent me a GET request"});
});

//POST /questions
// Route for creating questions
router.post("/", (req, res) => {
  res.json({
    response: "You sent me a POST request",
    body: req.body
  });
});

//GET /questions/:id
// Route for specific questions
router.get("/:qID", (req, res) => {
  res.json({
    response: "You sent me a GET request for ID " + req.params.qID
  });
});

//POST /questions/:qID/answers/:aID
// Route for creating questions
router.post("/:qID/answers/:aID", (req, res) => {
  res.json({
    response: "You sent me a POST request to /answers",
    questionId: req.params.qID,
    body: req.body
  });
});

//PUT /questions/:id/answers/:id
// Edit a specific answer
router.put("/:qID/answers/:aID", (req, res) => {
  res.json({
    response: "You sent me a POST request to /answers",
    questionId: req.params.qID,
    answerID: req.params.aID,
    body: req.body
  });
});

//DELETE /questions/:id/answers/:id
// Delete a specific answer
router.delete("/:qID/answers/:aID", (req, res) => {
  res.json({
    response: "You sent me a DELETE request to /answers",
    questionId: req.params.qID,
    answerID: req.params.aID,
  });
});

//POST /questions/:id/answers/:id/vote-up
//POST /questions/:id/answers/:id/vote-down
//Vote on a specific answer
router.post("/:qID/answers/:aID/:vote-:dir", (req, res) => {
  res.json({
    response: "You sent me a POST request to /vote-" + req.params.dir,
    questionId: req.params.qID,
    answerID: req.params.aID,
    vote: req.params.dir 
  });
});

module.exports = router;
