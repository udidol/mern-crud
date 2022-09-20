//+const mongoose = require( 'mongoose' );
const ListItem = require( './schemas/list-item' );

class ListManager {
	async getItems() {
		try {
			return await ListItem.find( {} );
		}
		catch ( err ) {
			console.log( err.message );

			return [];
		}
	}

	async addItem( item ) {
		try {
			const newItem = new ListItem( item );

			await newItem.save();

			console.log( 'item saved' );
		}
		catch ( err ) {
			console.log( err.message );
		}
	}

	async updateItem( item ) {
		try {
			await ListItem.findOneAndUpdate( { _id: item._id }, item );
	
			console.log( 'item updated' );
		}
		catch ( err ) {
			console.log( err.message );
		}
	}

	async deleteItem( id ) {
		try {
			await ListItem.deleteOne( { _id: id } );

			console.log( 'item deleted' );
		}
		catch ( err ) {
			console.log( err.message );
		}
	}

	async seedDatabase() {
		const items = [
			{
				name: 'Milk',
				checked: false,
				category: 'Dairy'
			},
			{
				name: 'Eggs',
				checked: false,
				category: 'Parve'
			},
			{
				name: 'Bread',
				checked: false,
				category: 'Bakery'
			}
		];

		try {
			await ListItem.insertMany( items );

			console.log( 'database seeded' );
		}
		catch ( err ) {
			console.log( err.message );
		}
	}
}

module.exports = new ListManager();