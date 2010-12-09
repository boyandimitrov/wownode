exports.Register = function( app, next )
{
	var db = app.db;
	var sys = require('sys');
	
	db.collection('user', function(err, users) 
	{
		users.indexInformation( function(err, indexes )
		{
			sys.puts(sys.inspect(indexes));
		});
	});
		
	
	app.post('/login', function( req, res ) {
		
		db.collection('user', function(err, users) 
		{
			users.find({login:req.body.id_login}, 
				function(err, cursor)
				{
					cursor.nextObject(
						function(err, user)
						{
							res.send( JSON.stringify(user) );
						});
				});
		});
    });

	app.post('/register', function( req, res ) {
		var user = {};
		user.login = req.body.id_login;
		user.password = req.body.id_password;
		
		db.collection('user', function(err, users) 
		{
			users.insert( user, function(e, u) {
				var result = {error:0};
				//res.sendHeader(200, { "Content-Type" : "text/json" });  
				res.send(JSON.stringify(u));  
			} );
		}); 
	});

	app.get('/session', function(req, res){
		  var body = '';
		  if (req.session.views) {
		    ++req.session.views;
		  } else {
		    req.session.views = 1;
		    body += '<p>First time visiting? view this page in several browsers :)</p>';
		  }
		  res.send(body + '<p>viewed <strong>' + req.session.views + '</strong> times.</p>');
		});
	
	if( next )
	{
		next();
	}
	
	/*
	app.get('/user/create/:name', function(req, res)
	{
		//sys.puts( sys.inspect(db) );
		
		var ModelUser = db.model('User');
		var user = new ModelUser();
		user.first = req.params.name;
		user.save(function() 
				{
					res.send('');
					res.end('');
				});
	});*/
};