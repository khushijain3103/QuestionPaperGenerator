const express = require('express');
const router = express.Router();

const { createQuestionPaper } = require("../controllers/question");

router.get("/create-paper", createQuestionPaper);

module.exports = router;
