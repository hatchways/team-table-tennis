const express = require("express");
const router = express.Router();
const { updateCalendar} = require('../controllers/calendar')
const {validateGetCalendar,validateUpdateCalendar} = require('../validate')

// router.route('/updateCalendar').put(updateCalendar, validateUpdateCalendar);

module.exports = router;
