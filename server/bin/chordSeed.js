require('dotenv').config();
const mongoose = require('mongoose');
const Chord = require('../models/Chords');

mongoose.connect(process.env.DBURL).then( () =>  console.log('connected to DB'));

function specificNote(note, sufix, times){
    let imageArray = []
    for(let i = 0; i < times; i++){
        imageArray.push(`../../assets/img/${note}${sufix}_${i}`)
    }
    return {
        completeName: `${note}${sufix}`,
        rootNote: note,
        sufix: sufix,
        images: imageArray
    }
}

function addNote(note){
    let result = [];
    result.push(specificNote(note, '',7));
    result.push(specificNote(note, '°',4));
    result.push(specificNote(note, '°7',5));
    result.push(specificNote(note, '+',5));
    result.push(specificNote(note, '+7',4));
    result.push(specificNote(note, '+7♭_0',1));
    result.push(specificNote(note, '+9',2));
    result.push(specificNote(note, '♭_6',7));
    result.push(specificNote(note, '♭°',5));
    result.push(specificNote(note, '♭°7',5));
    result.push(specificNote(note, '♭+',5));
    result.push(specificNote(note, '♭+7',4));
    result.push(specificNote(note, '♭+7♭',1));
    result.push(specificNote(note, '♭+7♯9',2));
    result.push(specificNote(note, '♭+9',2));
    result.push(specificNote(note, '♭5',4));
    result.push(specificNote(note, '♭6',4));
    result.push(specificNote(note, '♭7',5));
    result.push(specificNote(note, '♭7♭5',3));
    result.push(specificNote(note, '♭7♭5♯9',1));
    result.push(specificNote(note, '♭7♭9',4));
    result.push(specificNote(note, '♭7♯11',1));
    result.push(specificNote(note, '♭7sus4',4));
    result.push(specificNote(note, '♭9',6));
    result.push(specificNote(note, '♭9♭5',1));
    result.push(specificNote(note, '♭9sus4',3));
    result.push(specificNote(note, '♭11',5));
    result.push(specificNote(note, '♭13',4));
    result.push(specificNote(note, '♭13sus4',2));
    result.push(specificNote(note, '♭add9',6));
    result.push(specificNote(note, '♭aug',3));
    result.push(specificNote(note, '♭m',4));
    result.push(specificNote(note, '♭m6',5));
    result.push(specificNote(note, '♭m7',7));
    result.push(specificNote(note, '♭aug',3));
    result.push(specificNote(note, '♭m7♭5',9));
    result.push(specificNote(note, '♭m9',6));
    result.push(specificNote(note, '♭m9♭',1));
    result.push(specificNote(note, '♭m11',5));
    result.push(specificNote(note, '♭m13',5));
    result.push(specificNote(note, '♭madd',1));
    result.push(specificNote(note, '♭Maj7',5));
    result.push(specificNote(note, '♭Maj7#11',3));
    result.push(specificNote(note, '♭Maj9',5));
    result.push(specificNote(note, '♭Maj13',3));
    result.push(specificNote(note, '♭mMaj7',5));
    result.push(specificNote(note, '♭mMaj9',1));
    result.push(specificNote(note, '♭sus2',5));
    result.push(specificNote(note, '♭sus4',5));
    result.push(specificNote(note, '♯',6));
    result.push(specificNote(note, '♯°',8));
    result.push(specificNote(note, '♯+',5));
    result.push(specificNote(note, '♯+7',4));
    result.push(specificNote(note, '♯+7♭9',4));
    result.push(specificNote(note, '♯+9',2));
    result.push(specificNote(note, '♯+9',2));
    result.push(specificNote(note, '♯5',4));
    result.push(specificNote(note, '♯6',5));
    result.push(specificNote(note, '♯7',4));
    result.push(specificNote(note, '♯7♭5',3));
    result.push(specificNote(note, '♯7♭5♯9',1));
    result.push(specificNote(note, '♯7♭9',4));
    result.push(specificNote(note, '♯7♯9',3));
    result.push(specificNote(note, '♯7♯11',1));
    result.push(specificNote(note, '♯7sus2',4));
    result.push(specificNote(note, '♯9',7));
    result.push(specificNote(note, '♯9♭5',3));
    result.push(specificNote(note, '♯9sus4',2));
    result.push(specificNote(note, '♯11',6));
    result.push(specificNote(note, '♯13',4));
    result.push(specificNote(note, '♯13sus4',2));
    result.push(specificNote(note, '♯add9',4));
    result.push(specificNote(note, '♯aug9',2));
    result.push(specificNote(note, '♯m',5));
    result.push(specificNote(note, '♯m♭6',2));
    result.push(specificNote(note, '♯m6',6));
    result.push(specificNote(note, '♯m7',7));
    result.push(specificNote(note, '♯m7♭5',6));
    result.push(specificNote(note, '♯m9',4));
    result.push(specificNote(note, '♯m9♭5',1));
    result.push(specificNote(note, '♯m11',5));
    result.push(specificNote(note, '♯m13',4));
    result.push(specificNote(note, '♯madd9',1));
    result.push(specificNote(note, '♯Maj7',4));
    result.push(specificNote(note, '♯Maj7♯11',3));
    result.push(specificNote(note, '♯Maj9',5));
    result.push(specificNote(note, '♯Maj13',3));
    result.push(specificNote(note, '♯mMaj7',6));
    result.push(specificNote(note, '♯mMaj9',1));
    result.push(specificNote(note, '♯sus2',6));
    result.push(specificNote(note, '♯sus4',4));
    result.push(specificNote(note, '5',5));
    result.push(specificNote(note, '6',8));
    result.push(specificNote(note, '7',8));
    result.push(specificNote(note, '7♭5',4));
    result.push(specificNote(note, '7♭5♯9',1));
    result.push(specificNote(note, '7♭9',4));
    result.push(specificNote(note, '7♯9',3));
    result.push(specificNote(note, '7sus2',1));
    result.push(specificNote(note, '7sus4',6));
    result.push(specificNote(note, '9',8));
    result.push(specificNote(note, '9♭5',2));
    result.push(specificNote(note, '9sus4',2));
    result.push(specificNote(note, '11',7));
    result.push(specificNote(note, '13',5));
    result.push(specificNote(note, '13sus4',2));
    result.push(specificNote(note, 'add9',5));
    result.push(specificNote(note, 'aug',4));
    result.push(specificNote(note, 'm',6));
    result.push(specificNote(note, '13sus4',2));
    result.push(specificNote(note, 'm♭6',2));
    result.push(specificNote(note, 'm6',8));
    result.push(specificNote(note, 'm7',11));
    result.push(specificNote(note, 'm7♭5',7));
    result.push(specificNote(note, 'm9',6));
    result.push(specificNote(note, 'm9♭5',1));
    result.push(specificNote(note, 'm11',5));
    result.push(specificNote(note, 'm13',5));
    result.push(specificNote(note, 'madd9',1));
    result.push(specificNote(note, 'Maj7',6));
    result.push(specificNote(note, 'Maj7♯11',3));
    result.push(specificNote(note, 'Maj9',5));
    result.push(specificNote(note, 'Maj13',3));
    result.push(specificNote(note, 'mMaj7',5));
    result.push(specificNote(note, 'mMaj9',2));
    result.push(specificNote(note, 'sus2',5));
    result.push(specificNote(note, 'sus4',6));
    return result;
}

const chord = addNote('G')
console.log(chord);
Chord.create(chord)
  .then(chord => {
      console.log(chord);
      mongoose.disconnect();
  })
  .catch(e => console.log(e));