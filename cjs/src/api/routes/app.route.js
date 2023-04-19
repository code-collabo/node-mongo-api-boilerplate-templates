const express = require('express');
const { getAppController} = require('../controllers/app.controller');

let router = express.Router();

router.get('/', getAppController);

module.exports = router;
