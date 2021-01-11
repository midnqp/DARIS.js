var  qs = require('querystring'),
fs = require('fs'), 
path = require('path'), 
mysql = require('mysql'), 
url = require('url');

var daris = require('./components/daris.js');
var general = require('./components/general.js');

require('http').createServer(NodejsServer).listen(8000);



function NodejsServer(request, response) {
	var filePath = '.' + request.url;
	//if (filePath == './') { filePath = './index.html'; }
	console.log('REQUESTED FILEPATH ' + filePath);
	var fileExtension = String(path.extname(filePath)).toLowerCase();
	var contentType = general.mime_type(fileExtension);

	if (filePath === "./") {	daris.index(response, request, fs, mysqlconn); }
	else if (filePath === "./daris/write/") {
		daris.write(fs, response, request, qs, mysqlconn); 
	}
	else if (filePath.includes("./daris/question/")) {
		if (url.parse(request.url).query !== null) {
			daris.question(fs, response, request, mysqlconn);
		
			if (request.method == "POST") {
				daris.writeans(fs, response, request, mysqlconn);
			}
		}
	}
	
	else {
		fs.readFile(filePath, function(error, content) {
			if (error) { response.end("<h1>Couldn't find, bro. Sorry!</h1>"); }
			response.writeHead(200, {"Content-Type": contentType});
			response.end(content, 'utf-8');		}); 
	}
}


function mysqlconn(sql, callback) {  //(sql) does a mysql query
	var conn = mysql.createConnection({
		host:"localhost",
		user:"root",
		password:"Password@2",
		database:"daris" 
	});
	conn.connect(function (err) {if (err) throw err;});
	conn.query(sql, function (err, result) {
		if (err) throw err;
		callback(result);
	});
}
