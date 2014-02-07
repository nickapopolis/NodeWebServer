var querystring = require("querystring");
var mysql = require('mysql');
var fs = require('fs');

function start(response, postData) {
	console.log("Request handler 'start' was called.");
	
	//load html file for web page
	fs.readFile('./start.html', function (err, html) {
		if (err) {
			throw err; 
		}
		else
		{
			response.writeHeader(200, {"Content-Type": "text/html"});  
			response.write(html);  
			response.end(); 
		}
	});
}
//A users email and password are sent via post to this url
//The account information is then saved into a database on the server
function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	
	// Create a connection to MySql Server and Database
	var connection = mysql.createConnection({
	  host : 'localhost',
	  port : 3306,
	  database: 'avoiderDb',
	  user : 'root',
	  password : 'Georges8!'
	});
	
	connection.connect(function(err){
        if(err != null) {
            response.end('Error connecting to mysql:' + err+'\n');
        }
		else
		{
			//create our account info object to be saved in the database
			var post  = {
			  email: querystring.parse(postData).email,
			  password: querystring.parse(postData).password
			}; 
			//save the account info
			var query = connection.query('INSERT INTO users SET ?', post, function(err, result) {
				if(err != null) {
					response.end("Query error on insert:" + err);
				}
				else
				{
					response.end("Created new account!\nemail: " + post.email + "\npassword: "+ post.password);
				}
				// Close connection
				connection.end();
			});
		}
    });
}
function checkEmailExists(response, postData)
{
	console.log("Request handler 'upload' was called.");
	// Create a connection to MySql Server and Database
	var connection = mysql.createConnection({
	  host : 'localhost',
	  port : 3306,
	  database: 'avoiderDb',
	  user : 'root',
	  password : 'Georges8!'
	});
	connection.connect(function(err){
        if(err != null) {
            response.end('Error connecting to mysql:' + err+'\n');
        }
		else
		{
			//fetch the account info to verify it has been added to the database
			query = connection.query('SELECT * from users WHERE email = \'' +querystring.parse(postData).email +'\';', function(err, rows) {
				if(err != null) {
					response.end("Query error on select:" + err);
				} else {
					// Shows the result on console window
					var i = 0;
					while(rows[i] != undefined)
					{
						console.log(rows[i]);
						i++;
					}
					//returns the result of whether the email already exists
					var emailExistsJson = JSON.stringify({emailExists: rows.length>0});
					response.end(emailExistsJson);
				}
			});
			// Close connection
			connection.end();
		}
    });
	console.log(postData);
}
exports.start = start;
exports.upload = upload;
exports.checkEmailExists = checkEmailExists;