exports.Register = function( app )
{
	var db = app.db;
	var sys = require('sys');
	
	app.post('/login', function( req, res ) {
		
		/*
		var ModelUser = db.model('User');
		ModelUser.find({ login: req.body.id_login } ).all(function(arr){
			
			var result = {};
			
			sys.puts( sys.inspect( arr[0] ) );
			
			
			
			if( arr.lenght == 1 && arr[0].password == req.body.id_password )
			{
				result.error = 0;
				
				
				
				req.session.current_user = arr[0].ObjectId;
			}
			else
			{
				result.error = 1;
				result.error = "login failed";
			}
			
			res.send(JSON.stringify(result));  
			
		});*/
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