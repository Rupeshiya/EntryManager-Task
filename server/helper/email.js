const mongoose = require('mongoose');
const express = require('express');
const router = express.Router;
const nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
// const cron = require('node-cron');
require('dotenv').config();

const mailOptions = {
  to: '',
  from: `${process.env.emailFrom}`,
  subject: 'Test',
  text: 'test'
};

const transporter = nodemailer.createTransport({
  service: `${process.env.mailService}`,
  auth: {
    user: `${process.env.sendgridUsername}`,
    pass: `${process.env.sendgridPassword}`
  }
});

const sendMail = () => {
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log('error in sending the mail !!', err);
    }
    console.log('successfully sent the mail !!');
  });
};


module.exports = {
  transporter,
  mailOptions,
  sendMail
};