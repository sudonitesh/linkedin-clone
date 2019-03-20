const express = require('express');
const mongoose = require('mongoose')
const passport = require('passport')

const validateProfileInput = require('../validation/profile')
const Profile = require('../models/Profile')
const User = require('../models/User')

const router = express.Router();
require('../configs/passport')(passport)

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => {
  res.send('profile api')
});

// @route GET api/profile
// @desc Get current user's profile
// @access PRIVATE
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const errors = {};
  const id = req.user.id;
  console.log(id);
  // const id = '5c9296df6ff8e73105583592';

  Profile
    .findOne({
      user: id
    })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.nonprofile = 'no profile for this user';
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => {
      res.status(404).json(err);
    })
})

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  PRIVATE
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  const {
    errors,
    isValid
  } = validateProfileInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profileFields = {};
  const user = req.user.id;
  const handle = req.body.handle;
  const company = req.body.company;
  const website = req.body.website;
  const location = req.body.location;
  const bio = req.body.bio;
  const status = req.body.status;
  const githubusername = req.body.githubusername;
  const skills = req.body.skills;
  const youtube = req.body.youtube;
  const twitter = req.body.twitter;
  const facebook = req.body.facebook;
  const linkedin = req.body.linkedin;
  const instagram = req.body.instagram;

  if (handle) profileFields.handle = handle
  if (company) profileFields.company = company
  if (website) profileFields.website = website
  if (location) profileFields.location = location
  if (bio) profileFields.bio = bio
  if (status) profileFields.status = status
  if (githubusername) profileFields.githubusername = githubusername
  if (typeof (skills) !== 'undefined') profileFields.skills = skills.split(',')

  profileFields.social = {};

  if (youtube) profileFields.social.youtube = youtube
  if (twitter) profileFields.social.twitter = twitter
  if (facebook) profileFields.social.facebook = facebook
  if (linkedin) profileFields.social.linkedin = linkedin
  if (instagram) profileFields.social.instagram = instagram

  Profile
    .findOne({
      user
    })
    .then(profile => {
      if (profile) {
        Profile
          .findOneAndUpdate({
            user
          }, {
            $set: profileFields
          }, {
            new: true
          })
          .then(profile => res.json(profile))
      } else {
        Profile
          .findOne({
            handle: profileFields.handle
          })
          .then(profile => {
            if (profile) {
              errors.handle = 'handle taken by someone else'
              res.status(400).json(errors)
            }
            new Profile(profileFields).save().then(profile => res.json(profile))
          })
      }
    })
})

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({
      profile: 'There are no profiles'
    }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({
      handle: req.params.handle
    })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({
      user: req.params.user_id
    })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({
        profile: 'There is no profile for this user'
      })
    );
});


module.exports = router;