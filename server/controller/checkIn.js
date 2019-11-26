const mongoose = require('mongoose');
const User = require('../model/user');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const emailer = require('../helper/email');
const CheckInOutController = require('../controller/checkIn');
const checkInOut = require('../model/checksInOut');

function sendEmailFn(to, from, subject, text) {
  emailer.mailOptions.to = to;
  emailer.mailOptions.from = from;
  emailer.mailOptions.subject = subject;
  emailer.mailOptions.text = text;
  emailer.sendMail();
}

const emailInfo = {
  to: '',
  from: '',
  subject: '',
  text: ''
};

module.exports = {
  CheckInSubmit: (req, res) => {
    console.log("user info : ", req.user);
    // check for the existence of the user 
    const email = req.user.email;
    const phone = req.body.vistorPhone;
    const checksIn = req.body.vistorCheckIn;
    User.findById(req.user._id)
      .then((visitor) => {
        const checkInInfo = {
          email: visitor.email,
          name: visitor.name,
          phone: phone,
          checkIn: checksIn,
          visitedAt: Date.now()
        };
        const newVisitInfo = new checkInOut(checkInInfo)
          .save()
          .then((result) => {
            console.log('Check in info saved successfully', result);
            // before sending back to client send an email
            emailInfo.to = `devilwebdev@gmail.com`; // host email 
            emailInfo.from = 'rupeshiya@gmail.com';
            emailInfo.subject = "Visting";
            emailInfo.text = `
            Visitor details: 
            Name: ${visitor.name} \n\n
            phone: ${phone} \n\n
            email: ${email} \n\n
            checksIn: ${checksIn} \n\n
          `;
            sendEmailFn(emailInfo.to, emailInfo.from, emailInfo.subject, emailInfo.text);
            res.status(200).json({
              success: true,
              msg: 'Saved the check in detail '
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({
              success: false,
              msg: 'Something went wrong!!'
            });
          });
      });
  },
  CheckOutSubmit: (req, res) => {
    // check for the user 
    User.findById(req.user._id)
      .populate('checksInInfo', ['name', 'email', 'checkIn', 'checkOut'])
      .exec((err, user) => {
        console.log(user);
        if (err) {
          console.log(err);
        }
        if (!user) {
          return res.status(400).json({
            success: false,
            msg: 'User not found!!'
          });
        }
        emailInfo.to = user.email;
        emailInfo.from = "rupeshiya@gmail.com"; // host 
        emailInfo.subject = "Visiting details";
        emailInfo.text = `
        Visiting details: 
        Name: ${user.name} \n\n
        phone: ${user.phone} \n\n 
        Email: ${user.email},
        check-in: ${user.checkIn} \n\n
        check-out: ${req.body.checkout} \n\n
      `;
        sendEmailFn(emailInfo.to, emailInfo.from, emailInfo.subject, emailInfo.text);
        res.status(200).json({
          success: true,
          msg: 'successfully checkout!'
        });
      });
  }
}