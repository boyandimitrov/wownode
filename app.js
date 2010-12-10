/**
* Module dependencies.
*/

var express = require('./lib/express');

var app = express.createServer(
		  express.methodOverride(),
		  express.bodyDecoder(),
		  express.cookieDecoder(),

		  // Populates:
		  // - req.session
		  // - req.sessionStore
		  // - req.sessionID
		  express.session(),
		  express.staticProvider(__dirname + '/public')
		);

require( './plugins/db.js').Register( app, function() { require( './plugins/user.js').Register( app, null ); } );

app.listen(3000);

console.log('Express app started on port 3000');