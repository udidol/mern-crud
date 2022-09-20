const mongoose = require( 'mongoose' );

const listItemSchema = new mongoose.Schema( {
	name: String,
	checked: {
		type: Boolean,
		default: false,
	},
	category: String,
} );

module.exports = mongoose.model( 'ListItem', listItemSchema );