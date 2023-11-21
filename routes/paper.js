const express = require('express');
const router = express.Router();

const paperController = require('../controllers/paper');

router.get('/create-paper' , paperController.getQuestionpaper);

module.exports = router;