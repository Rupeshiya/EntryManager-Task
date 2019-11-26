const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const UserController = require('../controller/user');
const User = require('../model/user');


module.exports = { 
  RegisterUser :  (req,res)=>{
    // res.send('register works!!')
    // check if user already exists
    // User.findOne({ email: req.body.email })
    //     .then((user)=>{
    //         if(user){
    //             return res.status(400).json({success: false, msg: 'User already exists'});
    //         }
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     });

    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    // hash and save password 
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            newUser.password = hash;
            newUser.save()
            .then((user)=>{
                console.log('User successfully added!');
                res.status(200).json({
                  success: true,
                  msg: 'User registered'
                });
            })
            .catch((err)=>{
                console.log(err);
                res.status(500).json({success:false, msg: 'unable to register'});
            });
        })
    })
  },
  LoginUser : (req,res)=>{
    // res.send('auth works!!!');
    const username =  req.body.username;
    const password =  req.body.password;
    // match the password and email 
    User.findOne({username: username})
        .then((user)=>{
            // if user does not exists
            if(!user){
                console.log('user does not exists ');
                return res.status(404).json({success: false, msg: 'User does not exists'});
            }
            // if user exists 
            bcrypt.compare(password, user.password, (err, success)=>{
                if(err){
                    console.log('Something went wrong!');
                }
                if(!success){
                    return res.status(400).json({success: false, msg: 'Password does not matched!!'});
                }
                if(success){
                    const token = jwt.sign({ data: user }, keys.secret, {
                        expiresIn: 604800 // 1 week 
                    });
                    res.json({
                        success: true,
                        token: 'Bearer '+token,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email
                        }
                    });
                }
            })
        });
  }
}