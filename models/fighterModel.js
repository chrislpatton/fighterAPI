var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fighterModel = new Schema({
	firstName: String,
	lastName: String,
	weightClass: String,
	wins: Number,
	losses: Number,
	kos: Number,
	submissions: Number,
	champion: {type: Boolean, default: false}
});

module.exports = mongoose.model('Fighter', fighterModel);