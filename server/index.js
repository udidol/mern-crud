const express = require( 'express' );
const controller = require( './controller' );
const cors = require( 'cors' );
const mongoose = require( 'mongoose' );
const config = require( './config' );

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect( config.connectionString,
	() => console.log( 'connected to the DB' ),
	( e ) => console.log( e ),
);

app.use( express.json() );
app.use( cors() );

app.listen( port, () => {
	console.log( `listening on port ${port}` );
} );

controller( app );