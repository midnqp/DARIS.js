const qs = require('querystring');
const fs = require('fs');
const path = require('path');
const mysql = require('url');
const ar = require('./model/lib_avoidrepetition.js');


const routes = {
	 		: require('./model/'),

};
require('http').createServer(server).listen(8000);




function server(req, res) {
	const U = req.url;				// U = The requested URL
	if(U[0] !== '.') { U = `.${U}`; }
	



	if (irequrl[0] !== ".") { irequrl = `.${irequrl}`; }


	if (irequrl === "./") {
		DARIS_INDEX.render_index_page(req, res);
	}


	else if (irequrl.slice(0, 16) === "./question/write") {
		console.log("Write questions!");
	}


	else if (irequrl.slice(0, 7) === "./daris") { 
		FS.readFile(irequrl, (err, fileContent)=>{
			fileExtension = String(PATH.extname(irequrl)).toLowerCase();
			fileContentType = LIBAR.mime_type(fileExtension); 
			//console.log(`${filePath}    ${fileContentType}    ${fileExtension}`);
			
			res.writeHead(200, {"Content-Type" : fileContentType});
			res.end(fileContent);
		});
	}


	else { 
		res.writeHead(404);
		res.end("404 Not Found. Page doesn't exist!"); 
	}
}

