


exports.Register = function( app )
{
	sys = require("sys");
	test = require("assert");

	var Db = require('mongodb').Db,
	  Connection = require('mongodb').Connection,
	  Server = require('mongodb').Server,
	  // BSON = require('../lib/mongodb').BSONPure;
	  BSON = require('mongodb').BSONNative;

	var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
	var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;
	var dbname = process.env['MONGO_NODE_DRIVER_DBNAME'] != null ? process.env['MONGO_NODE_DRIVER_DBNAME'] : "test1";

	
	sys.puts("Connecting to " + host + ":" + port);
	var db = new Db( dbname , new Server(host, port, {auto_reconnect: true}), {native_parser:true});
	db.strict = false;
	db.open(
		function(err, db) 
		{ 
			sys.puts( sys.inspect( err ) );
			sys.puts( sys.inspect( db ) );
			
		});
	
	app.db = db; 
};