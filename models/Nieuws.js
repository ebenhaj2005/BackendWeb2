const mongoose = require('mongoose');

const nieuwsscheama = new mongoose.Schema({
    titel: {type: String, required: true},
    beschrijving: {type: String, required: true},
    datum: {type: Date, required: true},
    auteur: {type: String, required: true}
})
const Nieuws = mongoose.model('Nieuws', nieuwsscheama);
module.exports = Nieuws;