const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
naam: {
    type: String,
     required: true,
   validate:{
    validator: (v) => /^[a-zA-Z]+$/.test(v),
    message: "je naam mag alleen letters bevatten",
    },
   },  
email: {type: String, required: true},
wachtwoord: {type: String, required: true},

})
const Gebruiker = mongoose.model('Gebruiker', Schema);
module.exports = Gebruiker;


