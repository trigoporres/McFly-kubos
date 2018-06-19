var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var noteSchema = new Schema({
	'title' : String,
	'note' : String,
	'like' : Boolean,
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('note', noteSchema);