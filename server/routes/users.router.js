const express = require('express');
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => {
  res.send('users api')
});

// @route GET api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const password2 = req.body.password2;
  
  const {errors, isValid} = validateRegisterInput(req.body);
  
  if(!isValid) {
    return res.status(400).json(errors)
  }

  User
    .findOne({
      email
    })
    .then(user => {
      if (user) {
        errors.email = 'Email already exist';
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm' //size, rating, default
        })

        const newUser = new User({
          name,
          email,
          avatar,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            newUser.password = hash;

            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => {
                return res.status(400).json(err);
              })
          });
        });

      }
    });

});

// @route GET api/users/login
// @desc user login -> returns JWT
// @access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  // Find user by email
  User.findOne({
    email
  }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {id: user.id, name: user.name, avatar: user.avatar};
        jwt.sign(payload, process.env.JWT_KEY, {expiresIn: 1000000}, (err, token) => {
          if(err) {
            return res.status(400).json({error: "unable to sign token"})
          }
          res.json({
            success: true,
            token: 'Bearer ' + token 
          });
        })      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;