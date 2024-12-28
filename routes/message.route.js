const express = require('express');
const { sendMessage, getMessage } = require('../controllers/message.controller');
const authenticate = require("../middlewares/authenticate")
const router = express.Router();

router.post('/send/:id', authenticate, sendMessage);
router.get('/getmessage/:id', authenticate, getMessage);

module.exports = router