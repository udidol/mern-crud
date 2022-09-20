const ListManager = require( './models/list-manager.js' );

module.exports = async ( app ) => {
	app.get( '/api/list' , async ( req, res ) => {
		const items = await ListManager.getItems();

		res.json( items );
	} );

	app.post( '/api/add-item', async ( req, res ) => {
		ListManager.addItem( req.body.item );

		const items = await ListManager.getItems();

		res.json( items );
	} );

	app.post( '/api/delete-item', async ( req, res ) => {
		await ListManager.deleteItem( req.body.id );

		const items = await ListManager.getItems();

		res.json( items );
	} );

	ListManager.getItems()
		.then( async ( items ) => {
			if ( ! items.length ) {
				await ListManager.seedDatabase();
			}
		} );
};