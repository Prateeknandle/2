const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


// Bring in User Model
let User = require('../models/user');
router.get("/", function(req, res){
  res.render("home");
});
// Register Form
router.get("/signup", function(req, res){
  res.render("signup");
});
router.get("/loginpage", function(req, res){
  res.render("loginpage");
});
router.get("/blindcoding", function(req, res){
  res.render("/blindcoding");
});
router.get("/contactus", function(req, res){
  res.render("/contactus");
});
router.get("/designquest", function(req, res){
  res.render("designquest");
});
router.get("/events", function(req, res){
  res.render("events");
});
router.get("/hackathon", function(req, res){
  res.render("hackathon");
});
router.get("/programmersdate", function(req, res){
  res.render("programmersdate");
});
router.get("/robowar", function(req, res){
  res.render("robowar");
});
router.get("/techzibition", function(req, res){
  res.render("techzibition");
});

// Register Proccess
router.post('/signup', function(req, res){
  const username = req.body.username;
  const password = req.body.password;
  
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  let errors = req.validationErrors();

  if(errors){
    res.render('signup', {
      errors:errors
    });
  } else {
    let newUser = new User({
      username:username,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success','You are now registered and can log in');
            res.redirect('/users/loginpage');
          }
        });
      });
    });
  }
});

// Login Form
router.get('/loginpage', function(req, res){
  res.render('loginpage');
});

module.exports = router;
