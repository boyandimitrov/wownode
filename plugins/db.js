
function DAL()
{
}

DAL.prototype.Open = function( host, port, dbname, callback  )
{
	var self = this;
	
	var Db = require('mongodb').Db,
	Connection = require('mongodb').Connection,
	Server = require('mongodb').Server,
	// BSON = require('../lib/mongodb').BSONPure;
	BSON = require('mongodb').BSONNative;

	this.db = new Db( dbname , new Server(host, port, {auto_reconnect: true}), {native_parser:true});
	
	this.db.strict = false;
	this.db.open( callback );
};

DAL.prototype.CreateCollection = function( collectionName, indexes, callback )
{
	var self = this;
	
	this.db.collection(collectionName, function(err, coll) 
		{
			if ( indexes )
			{
				coll.ensureIndex(indexes, true, function( err, index )
				{
					if ( callback )
					{
						callback(err, coll);
					}
				});
			}
			else
			{
				if ( callback )
				{
					callback(err, coll);
				}
			}
			
		});
};

DAL.prototype.Insert = function( collectionName, entity, callback )
{
	var self = this;
	
	self.db.collection(collectionName, function(err, entities) 
		{
			entities.insert( entity, function(err, ent) 
			{
				self.db.error(function(err, error) {
					
			        if(error[0].err) {
			        	err = error[0];
			        }
			        
			        if ( callback)
			        {
			        	callback(err, ent);
			        }
				});
			});
		});
};

DAL.prototype.Find = function(collectionName, query, callback)
{
	var self = this;
	
	
	self.db.collection(collectionName, function(err, entities)
		{
			entities.find(query, 
				function(err, cursor)
				{
					cursor.nextObject(
						function(err, entity)
						{
							callback(err, entity);
							//res.send( JSON.stringify(user) );
						});
				});
		});
};

if( !exports.Dal )
{
	exports.Dal = new DAL();
}

//////////////////////////////////
exports.Register = function( app, next )
{
	sys = require("sys");
	test = require("assert");

	var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
	var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : 27017;
	var dbname = process.env['MONGO_NODE_DRIVER_DBNAME'] != null ? process.env['MONGO_NODE_DRIVER_DBNAME'] : "wownode";
	
	
	app.Dal = exports.Dal; 
	
	exports.Dal.Open( host, port, dbname, function( err, db ) 
		{ 
			
			if ( next )
			{
				next(); 
			}
		});
};
