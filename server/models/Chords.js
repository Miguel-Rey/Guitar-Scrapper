const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const newsSchema = new Schema({
  completeName: String,
  rootNote: String,
  sufix: String,
  images: {
    type: [String]
  }
});

const Chords = mongoose.model('Chords', newsSchema);
module.exports = Chords;