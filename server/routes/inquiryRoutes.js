const express = require('express');
const { check } = require('express-validator');
const inquiryController = require('../controllers/inquiryController');

const router = express.Router();

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('message', 'Message is required').not().isEmpty()
  ],
  inquiryController.sendInquiry
);

module.exports = router;
