const mongoose = require('mongoose');
const User = require('../model/user');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const emailer = require('../helper/email');
const CheckInOutController = require('../controller/checkIn');


// test route 
// /checks/test
router.get('/test', passport.authenticate('jwt', {session: false}), (req, res)=>{
  res.status(200).json({success: true, msg: 'successfully worked'});
})

// submit check in form 
// /check/in/submit
router.post('/in/submit', passport.authenticate('jwt', {session: false}), CheckInOutController.CheckInSubmit);

// check out submit 
// /check/out/submit
router.patch('/out/submit', passport.authenticate('jwt', {session: false}), CheckInOutController.CheckOutSubmit);

module.exports = router;