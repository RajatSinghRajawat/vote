const express = require('express');
const { signIn } = require('../controllers/admin.controller');
const app = express.Router();

/**
 * /api/v1/admin : POST
 */
app.post('/',signIn);

module.exports = app;