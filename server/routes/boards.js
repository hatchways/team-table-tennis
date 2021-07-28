const express = require("express");
const router = express.Router();

router.route('/create-board').post();

router.route('/create-column').post();

router.route('/update-column').post();

router.route('/create-card').post();

router.route('/move-card').post();