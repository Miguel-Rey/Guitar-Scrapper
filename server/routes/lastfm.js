require('dotenv').config();
const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Chord = require('../models/Chords');
const passport = require('passport');
const axios = require('axios');

router.get('/similar/:artist/:song', (req, res, next) => {
  const artist = req.params.artist;
  const song = req.params.song;
  const url = `http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${artist}&track=${song}&api_key=${process.env.LASTFMKEY}&format=json`
  axios.get(url)
  .then( response => {
    let similar = response.data;
    res.status(200).json(similar);
  })
})

router.get('/top', (req, res, next) => {
  axios.get(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${process.env.LASTFMKEY}&format=json&limit=50`)
  .then( response => {
    res.status(200).json(response.data);
  })
})

router.get('/artist', (req, res, next) => {
  axios.get(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${process.env.LASTFMKEY}&format=json&limit=50`)
  .then( response => {
    res.status(200).json(response.data);
  })
})
router.get('/info/:artist', (req, res, next) => {
  let artist = req.params.artist;
  axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${process.env.LASTFMKEY}&format=json`)
  .then ( response => {
    res.status(200).json(response.data);
  })
})

router.get('/info/song/:artist/:song', (req, res, next) => {
  let artist = req.params.artist;
  let song = req.param.song;
  axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.LASTFMKEY}&artist=${artist}&track=${song}&format=json
  `)
  .then ( response => {
    res.status(200).json(response.data);
  })
})

router.get('/geo/song', (req, res, next)=> {
  axios.get(`http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=${process.env.LASTFMKEY}&format=json`)
  .then( response => {
    res.status(200).json(response.data);
  })
})


router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})



module.exports = router;
