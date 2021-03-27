const qs = require('querystring');
const fs = require('fs');
const path = require('path');
const mysql = require('url');
const ar = require('./model/ctrl-lib.js');


const routes = {
	 		: require('./model/'),

};
require('http').createServer(server).listen(8000);




function server(req, res) {
	const U = req.url;				// U = The requested URL
	if(U[0] !== '.') { U = `.${U}`; }
	



	else if (irequrl.slice(0, 7) === "./daris") { 
		FS.readFile(irequrl, (err, fileContent)=>{
			fileExtension = String(PATH.extname(irequrl)).toLowerCase();
			fileContentType = LIBAR.mime_type(fileExtension); 
			
			res.writeHead(200, {"Content-Type" : fileContentType});
			res.end(fileContent);
		});
	}


	else { 
		res.writeHead(404);
		res.end("<code>404 Not Found. Page doesn't exist!</code>"); 
	}
}

