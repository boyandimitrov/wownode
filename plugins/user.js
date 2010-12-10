exports.Register = function( app, next )
{
	var sys = require('sys');

	//ensure index for user.login
	app.Dal.CreateCollection('user', [ ['login', 1] ], function( err, coll ) 
		{
			if( next )
			{ 
				next();
			} 
		});
	
	
	app.post('/login', function( req, res ) {
		app.Dal.Find('user', {login:req.body.id_login}, function(err, user)
				{
					res.send( JSON.stringify(user) );
				});
	});
	
	app.post('/register', function( req, res ) {
		var user = {};
		user.login = req.body.id_login;
		user.password = req.body.id_password;
		
		app.Dal.Insert('user', user, function(err, result)
			{
			
				res.send(JSON.stringify( {result:result, err:err} ));
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
};
