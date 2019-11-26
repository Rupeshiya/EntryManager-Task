const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const UserController = require('../controller/user');

// loading model
require('../model/user');
const User = require('../model/user');

// /users/register route
router.post('/register', UserController.RegisterUser);

// /users/authenticate route
router.post('/authenticate',UserController.LoginUser);

module.exports = router;